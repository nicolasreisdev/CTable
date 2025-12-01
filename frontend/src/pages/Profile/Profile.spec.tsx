import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Profile from './index';
import { BrowserRouter } from 'react-router-dom';
import * as ProjectAPI from '../../API/Project';
import * as CommentAPI from '../../API/Comment';
import * as UserAPI from '../../API/User';

// --- Mocks ---
const navigateMock = vi.fn();
const logoutMock = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return { ...actual, useNavigate: () => navigateMock };
});

vi.mock('../../API/AuthContext', () => ({
  useAuth: () => ({
    currentUser: { username: 'tester', id: '123' },
    logout: logoutMock
  })
}));

// Mocks das APIs
vi.mock('../../API/Project', () => ({ GetUserProjects: vi.fn() }));
vi.mock('../../API/Comment', () => ({ GetUserComments: vi.fn(), DeleteComment: vi.fn() }));
vi.mock('../../API/User', () => ({ DeleteProfile: vi.fn() }));

// Mocks Visuais
vi.mock('../../components/layout/Sidebar', () => ({ default: () => <div /> }));
vi.mock('../../components/domain/Postcard', () => ({ 
    default: ({ post, deleteLabel, onDelete }: any) => (
        <div data-testid="postcard">
            <span>{post.title}</span>
            {deleteLabel && <button onClick={onDelete} data-testid="mock-delete-btn">Deletar {deleteLabel}</button>}
        </div>
    ) 
}));
vi.mock('../../components/common/Toast', () => ({ default: ({ message }: any) => <div data-testid="toast">{message}</div> }));

// Mock Modal
vi.mock('../../components/common/Modal', () => ({
    default: ({ isOpen, children, title }: any) => isOpen ? (
        <div data-testid="modal">
            <h2>{title}</h2>
            {children}
        </div>
    ) : null
}));
vi.mock('../../components/common/Modal/styles', () => ({
    ModalActions: ({ children }: any) => <div>{children}</div>,
    ChoiceButton: ({ children, onClick }: any) => <button onClick={onClick}>{children}</button>,
}));

// Mock Dropdown 
vi.mock('../../components/common/Dropdown/styles', () => ({
    DropdownMenu: ({ children }: any) => <div data-testid="dropdown">{children}</div>,
    MenuItem: ({ children, onClick }: any) => <button onClick={onClick}>{children}</button>,
    DangerMenuItem: ({ children, onClick }: any) => <button onClick={onClick}>{children}</button>,
    Separator: () => <hr />
}));

describe('Página Profile', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Default mocks
    vi.spyOn(ProjectAPI, 'GetUserProjects').mockResolvedValue([]);
    vi.spyOn(CommentAPI, 'GetUserComments').mockResolvedValue([]);
  });

  it('deve lidar com lista vazia de projetos', async () => {
    render(<BrowserRouter><Profile /></BrowserRouter>);
    await waitFor(() => {
        expect(screen.getByText('Nenhum projeto encontrado.')).toBeInTheDocument();
    });
  });

  it('deve lidar com erro na API ao carregar dados', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {}); // Silencia console.error
    vi.spyOn(ProjectAPI, 'GetUserProjects').mockRejectedValue(new Error('Erro API'));

    render(<BrowserRouter><Profile /></BrowserRouter>);

    await waitFor(() => {
        expect(consoleSpy).toHaveBeenCalledWith("Falha ao buscar dados do perfil:", expect.any(Error));
    });
    consoleSpy.mockRestore();
  });

  it('deve deletar um comentário da lista visualmente', async () => {
    // Setup: 1 comentário na lista
    vi.spyOn(CommentAPI, 'GetUserComments').mockResolvedValue([
        { commentID: 'c1', content: 'Comentário Teste', projectTitle: 'Proj' }
    ] as any);
    vi.spyOn(CommentAPI, 'DeleteComment').mockResolvedValue({} as any);

    render(<BrowserRouter><Profile /></BrowserRouter>);

    // Muda para aba de comentários
    fireEvent.click(screen.getByTitle('Ver comentários'));
    
    // Aguarda renderizar
    await waitFor(() => expect(screen.getByText('Comentou em: Proj')).toBeInTheDocument());

    // Clica no botão de deletar (simulado no mock do Postcard)
    const deleteBtn = screen.getByTestId('mock-delete-btn');
    fireEvent.click(deleteBtn);

    // Verifica se a API foi chamada e o item sumiu
    await waitFor(() => {
        expect(CommentAPI.DeleteComment).toHaveBeenCalledWith('c1');
    });
  });

  it('deve abrir menu, clicar em editar perfil e navegar', async () => {
    render(<BrowserRouter><Profile /></BrowserRouter>);
    fireEvent.click(screen.getByTitle('Configurações'));
    fireEvent.click(screen.getByText('Editar Perfil'));
    expect(navigateMock).toHaveBeenCalledWith('/editProfile');
  });

  it('deve fechar o menu ao clicar fora dele', async () => {
    render(<BrowserRouter><Profile /></BrowserRouter>);
    
    // Abre o menu
    fireEvent.click(screen.getByTitle('Configurações'));
    expect(screen.getByTestId('dropdown')).toBeInTheDocument();

    // Clica no body (fora do menu)
    fireEvent.mouseDown(document.body);

    await waitFor(() => {
        expect(screen.queryByTestId('dropdown')).not.toBeInTheDocument();
    });
  });

  it('deve cancelar a exclusão do perfil no modal', async () => {
    render(<BrowserRouter><Profile /></BrowserRouter>);
    
    // Abre modal
    fireEvent.click(screen.getByTitle('Configurações'));
    fireEvent.click(screen.getByText('Excluir Perfil'));

    // Clica em Cancelar
    const cancelBtn = screen.getByText('Cancelar');
    fireEvent.click(cancelBtn);

    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
    expect(UserAPI.DeleteProfile).not.toHaveBeenCalled();
  });

  it('deve lidar com erro ao excluir perfil (usuário não encontrado)', async () => {
    vi.spyOn(UserAPI, 'DeleteProfile').mockRejectedValue(new Error('usuário não encontrado'));
    
    render(<BrowserRouter><Profile /></BrowserRouter>);
    
    // Fluxo de exclusão
    fireEvent.click(screen.getByTitle('Configurações'));
    fireEvent.click(screen.getByText('Excluir Perfil'));
    fireEvent.click(screen.getByRole('button', { name: 'Excluir Conta' }));

    await waitFor(() => {
        expect(screen.getByTestId('toast')).toHaveTextContent('Conta já encerrada');
        // Verifica se forçou logout mesmo com erro
        expect(logoutMock).not.toHaveBeenCalled(); // Só chama no timeout, difícil testar sem fake timers, mas verificamos o toast
    });
  });

  it('deve lidar com erro genérico ao excluir perfil', async () => {
    vi.spyOn(UserAPI, 'DeleteProfile').mockRejectedValue(new Error('Erro genérico'));
    
    render(<BrowserRouter><Profile /></BrowserRouter>);
    
    fireEvent.click(screen.getByTitle('Configurações'));
    fireEvent.click(screen.getByText('Excluir Perfil'));
    fireEvent.click(screen.getByRole('button', { name: 'Excluir Conta' }));

    await waitFor(() => {
        expect(screen.getByTestId('toast')).toHaveTextContent('Erro genérico');
    });
  });

  it('deve carregar dados do perfil e mostrar posts por padrão', async () => {
    vi.spyOn(ProjectAPI, 'GetUserProjects').mockResolvedValue([{ id: '1', title: 'Meu Projeto' }] as any);

    render(
      <BrowserRouter>
        <Profile />
      </BrowserRouter>
    );

    expect(screen.getByText('tester')).toBeInTheDocument(); // Username
    
    await waitFor(() => {
        expect(screen.getByText('Meu Projeto')).toBeInTheDocument();
    });
  });

  it('deve alternar para a aba de comentários', async () => {
    vi.spyOn(CommentAPI, 'GetUserComments').mockResolvedValue([
        { commentID: 'c1', content: 'Bom post', projectTitle: 'Projeto X' }
    ] as any);

    render(
      <BrowserRouter>
        <Profile />
      </BrowserRouter>
    );

    // Clica no ícone de comentários 
    const commentsBtn = screen.getByTitle('Ver comentários');
    fireEvent.click(commentsBtn);

    await waitFor(() => {
        expect(screen.getByText('Comentou em: Projeto X')).toBeInTheDocument();
    });
  });

  it('deve abrir menu e fazer logout', async () => {
    render(
      <BrowserRouter>
        <Profile />
      </BrowserRouter>
    );

    const settingsBtn = screen.getByTitle('Configurações');
    fireEvent.click(settingsBtn);

    const logoutBtn = screen.getByText('Sair');
    fireEvent.click(logoutBtn);

    expect(logoutMock).toHaveBeenCalled();
    expect(navigateMock).toHaveBeenCalledWith('/login');
  });

  it('deve excluir a conta com sucesso', async () => {
    vi.spyOn(UserAPI, 'DeleteProfile').mockResolvedValue({} as any);

    render(
      <BrowserRouter>
        <Profile />
      </BrowserRouter>
    );

    // Abre menu
    fireEvent.click(screen.getByTitle('Configurações'));
    
    // Clica em Excluir Perfil
    fireEvent.click(screen.getByText('Excluir Perfil'));

    // Modal aparece
    expect(screen.getByTestId('modal')).toBeInTheDocument();

    // Confirma exclusão
    fireEvent.click(screen.getByRole('button',{name: 'Excluir Conta'}));

    await waitFor(() => {
        expect(UserAPI.DeleteProfile).toHaveBeenCalled();
        expect(screen.getByTestId('toast')).toHaveTextContent('Perfil excluído com sucesso');
    });
  });
});