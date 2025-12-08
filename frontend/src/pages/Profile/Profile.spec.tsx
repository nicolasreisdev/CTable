import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Profile from './index';
import { BrowserRouter } from 'react-router-dom';
import * as ProjectAPI from '../../API/Project';
import * as CommentAPI from '../../API/Comment';
import * as UserAPI from '../../API/User';

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

vi.mock('../../API/Project', () => ({ GetUserProjects: vi.fn() }));
vi.mock('../../API/Comment', () => ({ GetUserComments: vi.fn(), DeleteComment: vi.fn() }));
vi.mock('../../API/User', () => ({ DeleteProfile: vi.fn() }));
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
vi.mock('../../components/common/Modal', () => ({
    default: ({ isOpen, children, title }: any) => isOpen ? <div data-testid="modal"><h2>{title}</h2>{children}</div> : null
}));
vi.mock('../../components/common/Modal/styles', () => ({
    ModalActions: ({ children }: any) => <div>{children}</div>,
    ChoiceButton: ({ children, onClick }: any) => <button onClick={onClick}>{children}</button>,
}));
vi.mock('../../components/common/Dropdown/styles', () => ({
    DropdownMenu: ({ children }: any) => <div data-testid="dropdown">{children}</div>,
    MenuItem: ({ children, onClick }: any) => <button onClick={onClick}>{children}</button>,
    DangerMenuItem: ({ children, onClick }: any) => <button onClick={onClick}>{children}</button>,
    Separator: () => <hr />
}));


describe('Página Profile', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(ProjectAPI, 'GetUserProjects').mockResolvedValue([]);
    vi.spyOn(CommentAPI, 'GetUserComments').mockResolvedValue([]);
  });

  it('deve lidar com lista vazia de projetos', async () => {
    render(<BrowserRouter><Profile /></BrowserRouter>);
    await waitFor(() => expect(screen.getByText('Nenhum projeto encontrado.')).toBeInTheDocument());
  });

  it('deve lidar com erro na API ao carregar dados', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(ProjectAPI, 'GetUserProjects').mockRejectedValue(new Error('Erro API'));
    render(<BrowserRouter><Profile /></BrowserRouter>);
    await waitFor(() => expect(consoleSpy).toHaveBeenCalledWith("Falha ao buscar dados do perfil:", expect.any(Error)));
    consoleSpy.mockRestore();
  });

  it('deve deletar um comentário da lista visualmente', async () => {
    vi.spyOn(CommentAPI, 'GetUserComments').mockResolvedValue([{ commentID: 'c1', content: 'Teste', projectTitle: 'Proj' }] as any);
    vi.spyOn(CommentAPI, 'DeleteComment').mockResolvedValue({} as any);

    render(<BrowserRouter><Profile /></BrowserRouter>);

    const commentsBtn = await screen.findByTitle('Ver comentários'); 
    fireEvent.click(commentsBtn);
    
    await waitFor(() => expect(screen.getByText('Comentou em: Proj')).toBeInTheDocument());

    const deleteBtn = screen.getByTestId('mock-delete-btn');
    fireEvent.click(deleteBtn);

    await waitFor(() => expect(CommentAPI.DeleteComment).toHaveBeenCalledWith('c1'));
  });


  it('deve abrir menu, clicar em editar perfil e navegar', async () => {
    render(<BrowserRouter><Profile /></BrowserRouter>);
    
    const settingsBtn = await screen.findByTitle('Configurações');
    fireEvent.click(settingsBtn);

    const editBtn = await screen.findByText('Editar Perfil'); 
    fireEvent.click(editBtn);
    
    expect(navigateMock).toHaveBeenCalledWith('/editProfile');
  });

  it('deve fechar o menu ao clicar fora dele', async () => {
    render(<BrowserRouter><Profile /></BrowserRouter>);
    
    const settingsBtn = await screen.findByTitle('Configurações');
    fireEvent.click(settingsBtn);
    
    await screen.findByTestId('dropdown');

    fireEvent.mouseDown(document.body);

    await waitFor(() => {
        expect(screen.queryByTestId('dropdown')).not.toBeInTheDocument();
    });
  });

  it('deve cancelar a exclusão do perfil no modal', async () => {
    render(<BrowserRouter><Profile /></BrowserRouter>);
    
    const settingsBtn = await screen.findByTitle('Configurações');
    fireEvent.click(settingsBtn);

    const deleteOption = await screen.findByText('Excluir Perfil');
    fireEvent.click(deleteOption);

    const cancelBtn = await screen.findByText('Cancelar');
    fireEvent.click(cancelBtn);

    await waitFor(() => expect(screen.queryByTestId('modal')).not.toBeInTheDocument());
    expect(UserAPI.DeleteProfile).not.toHaveBeenCalled();
  });

  it('deve lidar com erro ao excluir perfil (usuário não encontrado)', async () => {
    vi.spyOn(UserAPI, 'DeleteProfile').mockRejectedValue(new Error('usuário não encontrado'));
    
    render(<BrowserRouter><Profile /></BrowserRouter>);
    
    const settingsBtn = await screen.findByTitle('Configurações');
    fireEvent.click(settingsBtn);

    const deleteOption = await screen.findByText('Excluir Perfil');
    fireEvent.click(deleteOption);
    
    const confirmBtn = await screen.findByRole('button', { name: 'Excluir Conta' });
    fireEvent.click(confirmBtn);

    await waitFor(() => {
        expect(screen.getByTestId('toast')).toHaveTextContent('Conta já encerrada');
    });
  });

  it('deve lidar com erro genérico ao excluir perfil', async () => {
    vi.spyOn(UserAPI, 'DeleteProfile').mockRejectedValue(new Error('Erro genérico'));
    
    render(<BrowserRouter><Profile /></BrowserRouter>);
    
    const settingsBtn = await screen.findByTitle('Configurações');
    fireEvent.click(settingsBtn);

    const deleteOption = await screen.findByText('Excluir Perfil');
    fireEvent.click(deleteOption);
    
    const confirmBtn = await screen.findByRole('button', { name: 'Excluir Conta' });
    fireEvent.click(confirmBtn);

    await waitFor(() => {
        expect(screen.getByTestId('toast')).toHaveTextContent('Erro genérico');
    });
  });

  it('deve carregar dados do perfil e mostrar posts por padrão', async () => {
    vi.spyOn(ProjectAPI, 'GetUserProjects').mockResolvedValue([{ id: '1', title: 'Meu Projeto' }] as any);
    render(<BrowserRouter><Profile /></BrowserRouter>);
    await waitFor(() => expect(screen.getByText('tester')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('Meu Projeto')).toBeInTheDocument());
  });

  it('deve alternar para a aba de comentários', async () => {
    vi.spyOn(CommentAPI, 'GetUserComments').mockResolvedValue([{ commentID: 'c1', content: 'Bom post', projectTitle: 'Proj' }] as any);
    render(<BrowserRouter><Profile /></BrowserRouter>);

    const commentsBtn = await screen.findByTitle('Ver comentários');
    fireEvent.click(commentsBtn);

    await waitFor(() => expect(screen.getByText('Comentou em: Proj')).toBeInTheDocument());
  });

  it('deve abrir menu e fazer logout', async () => {
    render(<BrowserRouter><Profile /></BrowserRouter>);

    const settingsBtn = await screen.findByTitle('Configurações');
    fireEvent.click(settingsBtn);

    const logoutBtn = await screen.findByText('Sair');
    fireEvent.click(logoutBtn);

    expect(logoutMock).toHaveBeenCalled();
    expect(navigateMock).toHaveBeenCalledWith('/login');
  });

  it('deve excluir a conta com sucesso', async () => {
    vi.spyOn(UserAPI, 'DeleteProfile').mockResolvedValue({} as any);

    render(<BrowserRouter><Profile /></BrowserRouter>);

    const settingsBtn = await screen.findByTitle('Configurações');
    fireEvent.click(settingsBtn);
    
    const deleteOption = await screen.findByText('Excluir Perfil');
    fireEvent.click(deleteOption);

    const confirmBtn = await screen.findByRole('button', { name: 'Excluir Conta' });
    fireEvent.click(confirmBtn);

    await waitFor(() => {
        expect(UserAPI.DeleteProfile).toHaveBeenCalled();
        expect(screen.getByTestId('toast')).toHaveTextContent('Perfil excluído com sucesso');
    });
  });
});