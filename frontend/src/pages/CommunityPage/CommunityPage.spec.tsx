import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import CommunityPage from './index';
import { BrowserRouter } from 'react-router-dom';
import * as CommunityAPI from '../../API/Community';

// --- Mocks ---
const navigateMock = vi.fn();
const mockParams = { communityID: '100' };

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => navigateMock,
    useParams: () => mockParams,
  };
});

// Mock das APIs
vi.mock('../../API/Community', () => ({
    GetCommunityById: vi.fn(),
    JoinCommunity: vi.fn(),
    LeaveCommunity: vi.fn(),
    DeleteCommunity: vi.fn(),
}));

// Mocks Visuais
vi.mock('../../components/layout/Sidebar', () => ({ default: () => <div /> }));
vi.mock('../../components/domain/Postcard', () => ({ 
    default: ({ post }: { post: { title: string } }) => <div data-testid="postcard">{post.title}</div> 
}));
vi.mock('../../components/common/Toast', () => ({ 
    default: ({ message }: { message: string }) => <div data-testid="toast">{message}</div> 
}));

// Mock Modal (renderiza se aberto)
interface ModalMockProps {
    isOpen: boolean;
    children: React.ReactNode;
    title: string;
}

vi.mock('../../components/common/Modal', () => ({
    default: ({ isOpen, children, title }: ModalMockProps) => isOpen ? (
        <div data-testid="modal">
            <h2>{title}</h2>
            {children}
        </div>
    ) : null
}));

vi.mock('../../components/common/Modal/styles', () => ({
    ModalActions: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    ChoiceButton: ({ children, onClick }: { children: React.ReactNode; onClick: React.MouseEventHandler }) => <button onClick={onClick}>{children}</button>,
}));

// Mock Dropdown 
vi.mock('../../components/common/Dropdown/styles', () => {
    const DropdownMenu = ({ children }: { children: React.ReactNode }) => <div id="dropdown-menu-mock" data-testid="dropdown-menu">{children}</div>;
    DropdownMenu.toString = () => '#dropdown-menu-mock';
    
    return {
        DropdownMenu,
        MenuItem: ({ children, onClick }: { children: React.ReactNode; onClick: React.MouseEventHandler }) => <button onClick={onClick}>{children}</button>,
        DangerMenuItem: ({ children, onClick }: { children: React.ReactNode; onClick: React.MouseEventHandler }) => <button onClick={onClick}>{children}</button>,
        Separator: () => <hr />
    }
});


describe('Página CommunityPage', () => {
  const mockCommunityData = {
      community: {
          communityID: '100',
          name: 'Comunidade Teste',
          description: 'Descricao',
          memberCount: 10,
          technologies: ['React'],
          isMember: false,
          isAdmin: false
      },
      posts: [
          { id: 'p1', title: 'Post 1' }
      ]
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(CommunityAPI, 'GetCommunityById').mockResolvedValue(mockCommunityData);
  });

  it('deve carregar e renderizar os dados da comunidade e posts', async () => {
    render(
      <BrowserRouter>
        <CommunityPage />
      </BrowserRouter>
    );

    await waitFor(() => {
        expect(screen.getByText('Comunidade Teste')).toBeInTheDocument();
        expect(screen.getByText('10 membros')).toBeInTheDocument();
        expect(screen.getByText('Post 1')).toBeInTheDocument();
    });
  });

  it('deve permitir entrar na comunidade (Join)', async () => {
    // Comunidade onde NÃO sou membro
    vi.spyOn(CommunityAPI, 'GetCommunityById').mockResolvedValue(mockCommunityData);
    vi.spyOn(CommunityAPI, 'JoinCommunity').mockResolvedValue({} as unknown as void);

    render(
      <BrowserRouter>
        <CommunityPage />
      </BrowserRouter>
    );

    // Espera botão aparecer
    const joinBtn = await screen.findByText('Join');
    fireEvent.click(joinBtn);

    await waitFor(() => {
        expect(CommunityAPI.JoinCommunity).toHaveBeenCalledWith('100');
        expect(screen.getByTestId('toast')).toHaveTextContent('Você entrou na comunidade!');
    });
  });

  it('deve permitir sair da comunidade (Leave)', async () => {
    // Comunidade onde SOU membro
    const memberData = { ...mockCommunityData, community: { ...mockCommunityData.community, isMember: true } };
    vi.spyOn(CommunityAPI, 'GetCommunityById').mockResolvedValue(memberData);
    vi.spyOn(CommunityAPI, 'LeaveCommunity').mockResolvedValue({} as unknown as void);

    render(
      <BrowserRouter>
        <CommunityPage />
      </BrowserRouter>
    );

    // Clica em Sair
    const leaveBtn = await screen.findByText('Sair');
    fireEvent.click(leaveBtn);

    // Modal abre
    expect(screen.getByTestId('modal')).toBeInTheDocument();
    expect(screen.getByText('Sair da Comunidade')).toBeInTheDocument();

    // onfirma no modal 
    const buttons = screen.getAllByText('Sair');
    fireEvent.click(buttons[buttons.length - 1]);

    await waitFor(() => {
        expect(CommunityAPI.LeaveCommunity).toHaveBeenCalledWith('100');
        expect(screen.getByTestId('toast')).toHaveTextContent('Você saiu da comunidade.');
    });
  });

  it('deve permitir que o ADMIN exclua a comunidade', async () => {
    // Comunidade onde SOU ADMIN
    const adminData = { 
        ...mockCommunityData, 
        community: { ...mockCommunityData.community, isMember: true, isAdmin: true } 
    };
    vi.spyOn(CommunityAPI, 'GetCommunityById').mockResolvedValue(adminData);
    vi.spyOn(CommunityAPI, 'DeleteCommunity').mockResolvedValue({} as unknown as void);

    render(
      <BrowserRouter>
        <CommunityPage />
      </BrowserRouter>
    );

    // Espera carregar
    await screen.findByText('Comunidade Teste');
    
    const menuTrigger = document.querySelector('svg')?.parentElement; 
    if (menuTrigger) fireEvent.click(menuTrigger);

    // Menu abre. Clica em "Excluir Comunidade"
    const deleteOption = await screen.findByText('Excluir Comunidade');
    fireEvent.click(deleteOption);

    // Modal abre
    expect(screen.getByText('Excluir Comunidade')).toBeInTheDocument(); // Título do modal

    // Confirma exclusão
    const confirmBtn = screen.getByText('Excluir', { selector: 'button' });
    fireEvent.click(confirmBtn);

    await waitFor(() => {
        expect(CommunityAPI.DeleteCommunity).toHaveBeenCalledWith('100');
        expect(screen.getByTestId('toast')).toHaveTextContent('Comunidade excluída');
    });
  });
});