import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Postcard from './index';
import { BrowserRouter } from 'react-router-dom';
import * as ProjectAPI from '../../../API/Project';
import * as CommentAPI from '../../../API/Comment';


// Mock do hook useAuth
vi.mock('../../../API/AuthContext', () => ({
  useAuth: () => ({
    currentUser: { id: 'user123' }
  })
}));

// Mock do useNavigate
const navigateMock = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return { ...actual, useNavigate: () => navigateMock };
});

// Mock Styles do Postcard
interface StyledProps {
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler;
  onSubmit?: React.FormEventHandler;
  disabled?: boolean;
}

vi.mock('./styles', () => ({
  PostCardWrapper: ({ children, onClick }: StyledProps) => <div onClick={onClick} data-testid="postcard-wrapper">{children}</div>,
  PostHeader: ({ children }: StyledProps) => <div>{children}</div>,
  PostContent: ({ children }: StyledProps) => <div>{children}</div>,
  MenuWrapper: ({ children }: StyledProps) => <div>{children}</div>,
  MenuButton: ({ children, onClick }: StyledProps) => <button onClick={onClick} data-testid="menu-btn">{children}</button>,
  ActionRow: ({ children }: StyledProps) => <div>{children}</div>,
  ActionButton: ({ children, onClick }: StyledProps) => <button onClick={onClick}>{children}</button>,
  CommentForm: ({ children, onSubmit }: StyledProps) => <form onSubmit={onSubmit}>{children}</form>,
  CommentTextArea: (props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => <textarea {...props} />,
  CommentFooter: ({ children }: StyledProps) => <div>{children}</div>,
  CharacterCount: ({ children }: StyledProps) => <span>{children}</span>,
  SubmitCommentButton: ({ children, disabled }: StyledProps) => <button disabled={disabled}>{children}</button>,
  CommentsSection: ({ children }: StyledProps) => <div>{children}</div>,
  CommentItem: ({ children }: StyledProps) => <div>{children}</div>,
  CommentBubble: ({ children }: StyledProps) => <div>{children}</div>,
  CommentHeader: ({ children }: StyledProps) => <div>{children}</div>,
  CommentText: ({ children }: StyledProps) => <p>{children}</p>,
  DeleteCommentButton: ({ onClick }: StyledProps) => <button onClick={onClick} data-testid="delete-comment-btn">Delete</button>,
  CommentAvatar: () => <div />,
}));

vi.mock('../../common/Dropdown/styles', () => {
  const DropdownMenu = ({ children }: { children: React.ReactNode }) => (
    <div data-testid="dropdown-menu">
      {children}
    </div>
  );

  DropdownMenu.toString = () => 'section';

  return {
    DropdownMenu,
    MenuItem: ({ children, onClick }: StyledProps) => <button onClick={onClick}>{children}</button>,
    DangerMenuItem: ({ children, onClick }: StyledProps) => <button onClick={onClick} data-testid="delete-post-btn">{children}</button>,
  };
});

// Mock Modal e Toast
vi.mock('../../common/Modal', () => ({
  default: ({ isOpen, title, children }: { isOpen: boolean; title: string; children: React.ReactNode }) => isOpen ? (
    <div data-testid="modal">
      <h1>{title}</h1>
      {children}
    </div>
  ) : null,
}));

vi.mock('../../common/Modal/styles', () => ({
  ModalActions: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  ChoiceButton: ({ children, onClick }: StyledProps) => <button onClick={onClick}>{children}</button>,
}));

vi.mock('../../common/Toast', () => ({
  default: ({ message }: { message: string }) => <div data-testid="toast">{message}</div>,
}));

describe('Componente Postcard', () => {
  const mockPost = {
    id: 'proj1',
    title: 'Projeto Teste',
    description: 'Desc',
    projectID: 'proj1',
    author: { title: 'Author' },
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('NÃO deve navegar se clicar em um botão interativo dentro do card', () => {
    render(<BrowserRouter><Postcard post={mockPost as unknown as ProjectAPI.ProjectProps} showMenu={true} /></BrowserRouter>);
    
    fireEvent.click(screen.getByTestId('menu-btn'));
    
    // O menu deve abrir, mas a navegação NÃO deve ocorrer
    expect(screen.getByTestId('dropdown-menu')).toBeInTheDocument();
    expect(navigateMock).not.toHaveBeenCalled();
  });

  it('deve ir para a página de edição ao clicar em Editar', () => {
    render(<BrowserRouter><Postcard post={mockPost as unknown as ProjectAPI.ProjectProps} showMenu={true} /></BrowserRouter>);
    
    fireEvent.click(screen.getByTestId('menu-btn'));
    fireEvent.click(screen.getByText('Editar'));

    expect(navigateMock).toHaveBeenCalledWith('/editProject/proj1', expect.objectContaining({ state: { projectToEdit: mockPost } }));
  });

  it('deve exibir erro ao tentar deletar projeto falho', async () => {
    vi.spyOn(ProjectAPI, 'DeleteProject').mockRejectedValue(new Error('Erro ao deletar'));
    render(<BrowserRouter><Postcard post={mockPost as unknown as ProjectAPI.ProjectProps} showMenu={true} /></BrowserRouter>);

    fireEvent.click(screen.getByTestId('menu-btn'));
    fireEvent.click(screen.getByTestId('delete-post-btn'));
    
    const modalButtons = screen.getAllByText('Excluir');
    fireEvent.click(modalButtons[modalButtons.length - 1]);

    await waitFor(() => {
        expect(screen.getByTestId('toast')).toHaveTextContent('Erro ao excluir projeto');
    });
  });

  it('deve renderizar o post corretamente', () => {
    render(
        <BrowserRouter>
            <Postcard post={mockPost as unknown as ProjectAPI.ProjectProps} showMenu={false} />
        </BrowserRouter>
    );
    expect(screen.getByText('Projeto Teste')).toBeInTheDocument();
  });

  it('deve abrir o menu e permitir excluir o projeto', async () => {
    vi.spyOn(ProjectAPI, 'DeleteProject').mockResolvedValue(true as unknown as void);

    render(
        <BrowserRouter>
            <Postcard post={mockPost as unknown as ProjectAPI.ProjectProps} showMenu={true} />
        </BrowserRouter>
    );

    fireEvent.click(screen.getByTestId('menu-btn'));
    expect(screen.getByTestId('dropdown-menu')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('delete-post-btn'));
    
    const buttons = screen.getAllByText('Excluir');
    const confirmDeleteBtn = buttons[buttons.length - 1];
    fireEvent.click(confirmDeleteBtn);

    await waitFor(() => {
        expect(ProjectAPI.DeleteProject).toHaveBeenCalledWith('proj1');
        expect(screen.getByTestId('toast')).toHaveTextContent('Projeto excluído com sucesso!');
    });
  });

  it('deve carregar e exibir comentários ao abrir a caixa de comentários', async () => {
    const mockComments = [
        { commentID: 'c1', content: 'Bom trabalho!', authorID: 'user999', username: 'Outro' }
    ];
    vi.spyOn(CommentAPI, 'GetComments').mockResolvedValue(mockComments as unknown as CommentAPI.CommentProps[]);

    render(
        <BrowserRouter>
            <Postcard post={mockPost as unknown as ProjectAPI.ProjectProps} showMenu={false} />
        </BrowserRouter>
    );

    fireEvent.click(screen.getByText('Comentar'));

    await waitFor(() => {
        expect(screen.getByText('Bom trabalho!')).toBeInTheDocument();
    });
  });

  it('deve enviar um novo comentário', async () => {
    vi.spyOn(CommentAPI, 'CreateComment').mockResolvedValue({} as unknown as CommentAPI.CommentProps);
    vi.spyOn(CommentAPI, 'GetComments').mockResolvedValue([]);

    render(
        <BrowserRouter>
            <Postcard post={mockPost as unknown as ProjectAPI.ProjectProps} showMenu={false} />
        </BrowserRouter>
    );

    fireEvent.click(screen.getByText('Comentar'));

    const textarea = screen.getByPlaceholderText('Escreva seu comentário...');
    fireEvent.change(textarea, { target: { value: 'Novo comentário' } });

    fireEvent.click(screen.getByText('Enviar'));

    await waitFor(() => {
        expect(CommentAPI.CreateComment).toHaveBeenCalledWith('proj1', 'Novo comentário');
        expect(screen.getByTestId('toast')).toHaveTextContent('Comentário enviado!');
    });
  });

});