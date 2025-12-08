import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Feed from './';
import { BrowserRouter } from 'react-router-dom';
import * as ProjectAPI from '../../API/Project'; 

vi.mock('../../components/layout/Header', () => ({
  default: ({ onCreateClick }: { onCreateClick: () => void }) => (
    <button data-testid="header-create-btn" onClick={onCreateClick}>
      Header Create Button
    </button>
  ),
}));

vi.mock('../../components/layout/Sidebar', () => ({
  default: () => <div data-testid="sidebar-mock">Sidebar Mock</div>,
}));

vi.mock('../../components/domain/Postcard', () => ({
  default: ({ post }: { post: { title: string } }) => (
    <div data-testid="postcard-mock">{post.title}</div>
  ),
}));

interface ModalProps {
  isOpen: boolean;
  children: React.ReactNode;
  title: string;
}

vi.mock('../../components/common/Modal', () => ({
  default: ({ isOpen, children, title }: ModalProps) => 
    isOpen ? (
      <div data-testid="modal-mock">
        <h1>{title}</h1>
        {children}
      </div>
    ) : null,
}));

vi.mock('../../components/common/Modal/styles', () => ({
  ModalActions: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  ChoiceButton: ({ children, onClick }: { children: React.ReactNode; onClick: () => void }) => (
    <button onClick={onClick}>{children}</button>
  ),
}));

vi.mock('../../components/common/Toast', () => ({
  default: ({ message }: { message: string }) => <div data-testid="toast-mock">{message}</div>,
}));

const navigateMock = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

describe('Página Feed', () => {
  
  beforeEach(() => {
    vi.clearAllMocks(); // Limpa chamadas anteriores antes de cada teste
  });

  it('deve renderizar o layout base corretamente (Header e Sidebar)', async () => {
    // Mock da API retornando lista vazia inicialmente
    vi.spyOn(ProjectAPI, 'GetFeedProjects').mockResolvedValue([]);

    render(
      <BrowserRouter>
        <Feed />
      </BrowserRouter>
    );

    expect(screen.getByTestId('header-create-btn')).toBeInTheDocument();
    expect(screen.getByTestId('sidebar-mock')).toBeInTheDocument();

    await waitFor(() => expect(ProjectAPI.GetFeedProjects).toHaveBeenCalled());
  });

  it('deve buscar e exibir posts quando a API retorna sucesso', async () => {
    const mockPosts = [
      { id: '1', title: 'Projeto Alpha', projectID: '1' },
      { id: '2', title: 'Comunidade Beta', projectID: '2' },
    ];
    
    // Simula resposta positiva da API
    vi.spyOn(ProjectAPI, 'GetFeedProjects').mockResolvedValue(mockPosts as unknown as ProjectAPI.ProjectProps[]);

    render(
      <BrowserRouter>
        <Feed />
      </BrowserRouter>
    );

    // Aguarda a renderização dos posts 
    await waitFor(() => {
        expect(screen.getAllByTestId('postcard-mock')).toHaveLength(2);
    });
    
    expect(screen.getByText('Projeto Alpha')).toBeInTheDocument();
    expect(screen.getByText('Comunidade Beta')).toBeInTheDocument();
  });

  it('deve exibir mensagem de "Nenhum post" quando a API retorna lista vazia', async () => {
    vi.spyOn(ProjectAPI, 'GetFeedProjects').mockResolvedValue([]);

    render(
      <BrowserRouter>
        <Feed />
      </BrowserRouter>
    );

    await waitFor(() => {
    expect(
        screen.getByRole('heading', { name: /Nenhum post encontrado/i })
    ).toBeInTheDocument();
});
  });

  it('deve exibir um Toast de erro se a API falhar', async () => {
    // Simula erro na API
    vi.spyOn(ProjectAPI, 'GetFeedProjects').mockRejectedValue(new Error('Erro API'));

    render(
      <BrowserRouter>
        <Feed />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId('toast-mock')).toHaveTextContent('Não foi possível carregar o feed.');
    });
  });

  it('deve abrir o modal ao clicar no botão do Header e navegar para Criar Projeto', async () => {
    vi.spyOn(ProjectAPI, 'GetFeedProjects').mockResolvedValue([]);

    render(
      <BrowserRouter>
        <Feed />
      </BrowserRouter>
    );

    expect(screen.queryByTestId('modal-mock')).not.toBeInTheDocument();

    fireEvent.click(screen.getByTestId('header-create-btn'));

    expect(screen.getByTestId('modal-mock')).toBeInTheDocument();
    expect(screen.getByText('O que você deseja criar?')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Criar Projeto'));

    expect(navigateMock).toHaveBeenCalledWith('/createProject');
    await waitFor(() => expect(ProjectAPI.GetFeedProjects).toHaveBeenCalled());
  });

  it('deve navegar para Criar Comunidade através do modal', async () => {
    vi.spyOn(ProjectAPI, 'GetFeedProjects').mockResolvedValue([]);

    render(
      <BrowserRouter>
        <Feed />
      </BrowserRouter>
    );

    // Abre o modal
    fireEvent.click(screen.getByTestId('header-create-btn'));

    // Clica em "Criar Comunidade"
    fireEvent.click(screen.getByText('Criar Comunidade'));

    // Verifica navegação
    expect(navigateMock).toHaveBeenCalledWith('/createCommunity');
    await waitFor(() => expect(ProjectAPI.GetFeedProjects).toHaveBeenCalled());
  });
});