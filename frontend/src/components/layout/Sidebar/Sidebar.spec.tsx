import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Sidebar from './index';
import { BrowserRouter } from 'react-router-dom';
import * as CommunityAPI from '../../../API/Community';
import * as AuthContext from '../../../API/AuthContext';

// --- Mocks ---

// Mock do contexto de autenticação
vi.mock('../../../API/AuthContext', () => ({
  useAuth: () => ({
    currentUser: { id: 'user123', username: 'tester' }
  })
}));

interface StyleProps {
  children?: React.ReactNode;
  to?: string;
  onClick?: React.MouseEventHandler;
}

// Mock dos estilos do Sidebar
vi.mock('./styles', () => ({
  SidebarContainer: ({ children }: StyleProps) => <aside data-testid="sidebar-container">{children}</aside>,
  SidebarNav: ({ children }: StyleProps) => <nav>{children}</nav>,
  HomeLink: ({ children, to }: StyleProps) => <a href={to}>{children}</a>,
  CommunitiesHeader: ({ children, onClick }: StyleProps) => (
    <div data-testid="communities-header" onClick={onClick}>{children}</div>
  ),
  CommunitiesList: ({ children }: StyleProps) => <div data-testid="communities-list">{children}</div>,
  CommunityLink: ({ children, to }: StyleProps) => <a href={to}>{children}</a>,
  CommunityIcon: (props: React.ImgHTMLAttributes<HTMLImageElement>) => <img {...props} />,
}));

describe('Componente Sidebar', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve renderizar a estrutura básica e o link Home', async () => {
    // Mock da API retornando lista vazia
    vi.spyOn(CommunityAPI, 'GetAllCommunities').mockResolvedValue([]);

    render(
      <BrowserRouter>
        <Sidebar />
      </BrowserRouter>
    );

    expect(screen.getByTestId('sidebar-container')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('COMUNIDADES')).toBeInTheDocument();
    
    // Aguarda o useEffect terminar para limpar warnings
    await waitFor(() => expect(CommunityAPI.GetUserCommunities).toHaveBeenCalled());
  });

  it('deve buscar e listar as comunidades do usuário', async () => {
    const mockCommunities = [
      { communityID: '1', name: 'React Brasil' },
      { communityID: '2', name: 'Frontend' }
    ];
    vi.spyOn(CommunityAPI, 'GetAllCommunities').mockResolvedValue(mockCommunities as unknown as CommunityAPI.CommunityProps[]);

    render(
      <BrowserRouter>
        <Sidebar />
      </BrowserRouter>
    );

    // Espera as comunidades aparecerem na tela
    await waitFor(() => {
        expect(screen.getByText('React Brasil')).toBeInTheDocument();
        expect(screen.getByText('Frontend')).toBeInTheDocument();
    });

    // Verifica se os links estão corretos
    const linkReact = screen.getByText('React Brasil').closest('a');
    expect(linkReact).toHaveAttribute('href', '/r/1');
  });

  it('deve alternar a visibilidade da lista de comunidades ao clicar no header', async () => {
    vi.spyOn(CommunityAPI, 'GetAllCommunities').mockResolvedValue([]);

    render(
      <BrowserRouter>
        <Sidebar />
      </BrowserRouter>
    );

    expect(screen.getByTestId('communities-list')).toBeInTheDocument();

    // Clica para fechar
    fireEvent.click(screen.getByTestId('communities-header'));

    // A lista não deve estar mais no documento
    expect(screen.queryByTestId('communities-list')).not.toBeInTheDocument();

    // Clica para abrir novamente
    fireEvent.click(screen.getByTestId('communities-header'));
    expect(screen.getByTestId('communities-list')).toBeInTheDocument();

    await waitFor(() => expect(CommunityAPI.GetUserCommunities).toHaveBeenCalled());
  });
});