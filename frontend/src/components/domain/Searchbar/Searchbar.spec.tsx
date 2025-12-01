import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Searchbar from './';
import { BrowserRouter } from 'react-router-dom';
import * as CommunityAPI from '../../../API/Community';
import * as ProjectAPI from '../../../API/Project';

// Mocks de estilos
vi.mock('./styles', () => ({
  SearchWrapper: ({ children, ref }: any) => <div ref={ref}>{children}</div>,
  SearchInput: (props: any) => <input data-testid="search-input" {...props} />,
  ResultsDropdown: ({ children }: any) => <div data-testid="dropdown">{children}</div>,
  ResultSection: ({ children }: any) => <div>{children}</div>,
  ResultItem: ({ children, onClick }: any) => <button onClick={onClick}>{children}</button>,
  NoResults: ({ children }: any) => <div>{children}</div>,
}));

// Mock do useNavigate
const navigateMock = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return { ...actual, useNavigate: () => navigateMock };
});

describe('Componente Searchbar', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve fechar o dropdown ao clicar fora do componente', async () => {
    vi.spyOn(CommunityAPI, 'GetAllCommunities').mockResolvedValue([]);
    vi.spyOn(ProjectAPI, 'GetFeedProjects').mockResolvedValue([]);

    render(<BrowserRouter><Searchbar /></BrowserRouter>);

    const input = screen.getByTestId('search-input');
    
    // Abre dropdown
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: 'a' } });
    
    await waitFor(() => expect(screen.getByTestId('dropdown')).toBeInTheDocument());

    // Clica fora
    fireEvent.mouseDown(document.body);

    await waitFor(() => {
        expect(screen.queryByTestId('dropdown')).not.toBeInTheDocument();
    });
  });

  it('deve navegar para uma comunidade', async () => {
    vi.spyOn(CommunityAPI, 'GetAllCommunities').mockResolvedValue([
        { communityID: 'c1', name: 'Comunidade Java' } as any
    ]);
    vi.spyOn(ProjectAPI, 'GetFeedProjects').mockResolvedValue([]);

    render(<BrowserRouter><Searchbar /></BrowserRouter>);

    const input = screen.getByTestId('search-input');
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: 'Java' } });

    const result = await screen.findByText('Comunidade Java');
    fireEvent.click(result);

    expect(navigateMock).toHaveBeenCalledWith('/r/c1');
    expect(input).toHaveValue(''); // Verifica se limpou a query
  });

  it('deve limpar resultados se input ficar vazio', async () => {
    vi.spyOn(ProjectAPI, 'GetFeedProjects').mockResolvedValue([{ id: '1', title: 'Teste' }] as any);
    render(<BrowserRouter><Searchbar /></BrowserRouter>);

    const input = screen.getByTestId('search-input');
    
    // Digita algo
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: 'Teste' } });
    await screen.findByText('Teste');

    // Apaga tudo
    fireEvent.change(input, { target: { value: '' } });

    await waitFor(() => {
        expect(screen.queryByTestId('dropdown')).not.toBeInTheDocument();
    });
  });

  it('deve carregar dados ao focar no input e filtrar resultados', async () => {
    // Mock das APIs
    vi.spyOn(CommunityAPI, 'GetAllCommunities').mockResolvedValue([
      { communityID: '1', name: 'React Devs', description: 'Teste' } as any
    ]);
    vi.spyOn(ProjectAPI, 'GetFeedProjects').mockResolvedValue([
      { id: '10', title: 'Projeto Vitest', authorUsername: 'user1' } as any
    ]);

    render(
      <BrowserRouter>
        <Searchbar />
      </BrowserRouter>
    );

    const input = screen.getByTestId('search-input');
    
    // Focar no input deve disparar o carregamento
    fireEvent.focus(input);
    
    // Digitar algo
    fireEvent.change(input, { target: { value: 'Vitest' } });

    // Aguarda o dropdown aparecer e os resultados serem filtrados
    const projectItem = await screen.findByText('Projeto Vitest');
    expect(projectItem).toBeInTheDocument();

    // Deve mostrar o Projeto, mas não a Comunidade (pois 'React Devs' não bate com 'Vitest')
    expect(screen.getByText('Projeto Vitest')).toBeInTheDocument();
    expect(screen.queryByText('React Devs')).not.toBeInTheDocument();
  });

  it('deve navegar ao clicar em um resultado', async () => {
    vi.spyOn(CommunityAPI, 'GetAllCommunities').mockResolvedValue([]);
    vi.spyOn(ProjectAPI, 'GetFeedProjects').mockResolvedValue([
      { id: '99', title: 'Projeto X' } as any
    ]);

    render(
      <BrowserRouter>
        <Searchbar />
      </BrowserRouter>
    );

    const input = screen.getByTestId('search-input');
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: 'X' } });

    await waitFor(() => {
        expect(screen.getByText('Projeto X')).toBeInTheDocument();
    });

    // Clica no resultado
    fireEvent.click(screen.getByText('Projeto X'));

    // Verifica navegação
    expect(navigateMock).toHaveBeenCalledWith('/project/99');
  });

  it('deve exibir "Nenhum resultado encontrado" se a busca não bater', async () => {
    vi.spyOn(CommunityAPI, 'GetAllCommunities').mockResolvedValue([]);
    vi.spyOn(ProjectAPI, 'GetFeedProjects').mockResolvedValue([]);

    render(
      <BrowserRouter>
        <Searchbar />
      </BrowserRouter>
    );

    const input = screen.getByTestId('search-input');
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: 'Nada' } });

    await waitFor(() => {
      expect(screen.getByText('Nenhum resultado encontrado.')).toBeInTheDocument();
    });
  });
});