import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Postcard from './index';
import { BrowserRouter } from 'react-router-dom';
import * as ProjectAPI from '../../../API/Project';
import * as CommentAPI from '../../../API/Comment';

// --- Mocks ---

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
vi.mock('./styles', () => ({
  PostCardWrapper: ({ children, onClick }: any) => <div onClick={onClick} data-testid="postcard-wrapper">{children}</div>,
  PostHeader: ({ children }: any) => <div>{children}</div>,
  PostContent: ({ children }: any) => <div>{children}</div>,
  MenuWrapper: ({ children }: any) => <div>{children}</div>,
  MenuButton: ({ children, onClick }: any) => <button onClick={onClick} data-testid="menu-btn">{children}</button>,
  ActionRow: ({ children }: any) => <div>{children}</div>,
  ActionButton: ({ children, onClick }: any) => <button onClick={onClick}>{children}</button>,
  CommentForm: ({ children, onSubmit }: any) => <form onSubmit={onSubmit}>{children}</form>,
  CommentTextArea: (props: any) => <textarea {...props} />,
  CommentFooter: ({ children }: any) => <div>{children}</div>,
  CharacterCount: ({ children }: any) => <span>{children}</span>,
  SubmitCommentButton: ({ children, disabled }: any) => <button disabled={disabled}>{children}</button>,
  CommentsSection: ({ children }: any) => <div>{children}</div>,
  CommentItem: ({ children }: any) => <div>{children}</div>,
  CommentBubble: ({ children }: any) => <div>{children}</div>,
  CommentHeader: ({ children }: any) => <div>{children}</div>,
  CommentText: ({ children }: any) => <p>{children}</p>,
  DeleteCommentButton: ({ onClick }: any) => <button onClick={onClick} data-testid="delete-comment-btn">Delete</button>,
  CommentAvatar: () => <div />,
}));

vi.mock('../../common/Dropdown/styles', () => {
  const DropdownMenu = ({ children }: any) => (
    <div data-testid="dropdown-menu">
      {children}
    </div>
  );

  DropdownMenu.toString = () => 'section';

  return {
    DropdownMenu,
    MenuItem: ({ children, onClick }: any) => <button onClick={onClick}>{children}</button>,
    DangerMenuItem: ({ children, onClick }: any) => <button onClick={onClick} data-testid="delete-post-btn">{children}</button>,
  };
});

// Mock Modal e Toast
vi.mock('../../common/Modal', () => ({
  default: ({ isOpen, title, children }: any) => isOpen ? (
    <div data-testid="modal">
      <h1>{title}</h1>
      {children}
    </div>
  ) : null,
}));

vi.mock('../../common/Modal/styles', () => ({
  ModalActions: ({ children }: any) => <div>{children}</div>,
  ChoiceButton: ({ children, onClick }: any) => <button onClick={onClick}>{children}</button>,
}));

vi.mock('../../common/Toast', () => ({
  default: ({ message }: any) => <div data-testid="toast">{message}</div>,
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

  it('deve renderizar o post corretamente', () => {
    render(
        <BrowserRouter>
            <Postcard post={mockPost as any} showMenu={false} />
        </BrowserRouter>
    );
    expect(screen.getByText('Projeto Teste')).toBeInTheDocument();
  });

  it('deve abrir o menu e permitir excluir o projeto', async () => {
    vi.spyOn(ProjectAPI, 'DeleteProject').mockResolvedValue(true as any);

    render(
        <BrowserRouter>
            <Postcard post={mockPost as any} showMenu={true} />
        </BrowserRouter>
    );

    fireEvent.click(screen.getByTestId('menu-btn'));
    expect(screen.getByTestId('dropdown-menu')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('delete-post-btn'));
    
    // Confirmação no Modal (o último botão "Excluir" está no modal)
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
    vi.spyOn(CommentAPI, 'GetComments').mockResolvedValue(mockComments as any);

    render(
        <BrowserRouter>
            <Postcard post={mockPost as any} showMenu={false} />
        </BrowserRouter>
    );

    fireEvent.click(screen.getByText('Comentar'));

    await waitFor(() => {
        expect(screen.getByText('Bom trabalho!')).toBeInTheDocument();
    });
  });

  it('deve enviar um novo comentário', async () => {
    vi.spyOn(CommentAPI, 'CreateComment').mockResolvedValue({} as any);
    vi.spyOn(CommentAPI, 'GetComments').mockResolvedValue([]);

    render(
        <BrowserRouter>
            <Postcard post={mockPost as any} showMenu={false} />
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