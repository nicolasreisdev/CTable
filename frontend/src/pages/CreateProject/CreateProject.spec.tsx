import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import CreateProject from './index';
import { BrowserRouter } from 'react-router-dom';
import * as ProjectAPI from '../../API/Project';
import * as KeywordsAPI from '../../API/Keywords';

// --- Mocks ---

const navigateMock = vi.fn();
let mockLocationState: any = null; 

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => navigateMock,
    useLocation: () => ({ state: mockLocationState }),
    useParams: () => ({ projectId: undefined }),
  };
});

// Mock da API
vi.mock('../../API/Project', async () => {
    const actual = await vi.importActual('../../API/Project');
    return {
        ...actual,
        NewProject: vi.fn(),
        UpdateProject: vi.fn(),
    }
});

vi.mock('../../API/Keywords', () => ({
  GetKeywords: vi.fn(),
}));

// Mocks Visuais
vi.mock('../../components/layout/Sidebar', () => ({ default: () => <div data-testid="sidebar" /> }));
vi.mock('../../components/common/Toast', () => ({ default: ({ message }: any) => <div data-testid="toast">{message}</div> }));

// Mock do TagInput
vi.mock('../../components/domain/TagInput', () => ({
  default: ({ onChange, value }: any) => (
    <input 
      data-testid="tag-input" 
      value={value.join(',')} 
      onChange={(e) => onChange(e.target.value.split(','))} 
    />
  )
}));

describe('Página CreateProject', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockLocationState = null; 
    vi.spyOn(KeywordsAPI, 'GetKeywords').mockResolvedValue(['React', 'Node']);
  });

  it('deve renderizar o formulário em modo de Criação', async () => {
    render(
      <BrowserRouter>
        <CreateProject />
      </BrowserRouter>
    );

    expect(screen.getByRole('heading', { name: 'Criar Projeto' })).toBeInTheDocument();
    
    expect(screen.getByLabelText('Nome do Projeto')).toBeInTheDocument();
    
    // Aguarda o carregamento das keywords
    await waitFor(() => expect(KeywordsAPI.GetKeywords).toHaveBeenCalled());
  });

  it('deve preencher o formulário e criar um novo projeto', async () => {
    render(
      <BrowserRouter>
        <CreateProject />
      </BrowserRouter>
    );

    // Preenche campos
    fireEvent.change(screen.getByLabelText('Nome do Projeto'), { target: { value: 'Novo App' } });
    fireEvent.change(screen.getByLabelText('Descrição do Projeto'), { target: { value: 'Descrição teste' } });
    
    const dateInput = screen.getByLabelText('Data de Início');
    fireEvent.change(dateInput, { target: { value: '20/11/2025' } });

    fireEvent.change(screen.getByLabelText('Status'), { target: { value: 'em-andamento' } });

    const submitBtn = screen.getByRole('button', { name: 'Criar Projeto' });
    fireEvent.click(submitBtn);

    await waitFor(() => {
        expect(ProjectAPI.NewProject).toHaveBeenCalledWith(expect.objectContaining({
            title: 'Novo App',
            description: 'Descrição teste',
            status: 'em-andamento'
        }));
        expect(screen.getByTestId('toast')).toHaveTextContent('Projeto criado com sucesso!');
    });
  });

  it('deve renderizar em modo de Edição se houver state no location', async () => {
    mockLocationState = {
        projectToEdit: {
            id: '123',
            title: 'Projeto Existente',
            description: 'Desc',
            startDate: '2023-01-01',
            status: 'pausado',
            technologies: ['React']
        }
    };

    render(
      <BrowserRouter>
        <CreateProject />
      </BrowserRouter>
    );

    expect(screen.getByRole('heading', { name: 'Editar Projeto' })).toBeInTheDocument();
    expect(screen.getByDisplayValue('Projeto Existente')).toBeInTheDocument();
    expect(screen.getByText('Atualizar Projeto')).toBeInTheDocument();
    
    await waitFor(() => expect(KeywordsAPI.GetKeywords).toHaveBeenCalled());
  });

  it('deve chamar UpdateProject ao submeter em modo de edição', async () => {
    mockLocationState = {
        projectToEdit: {
            id: '123',
            title: 'Projeto Antigo',
            startDate: '2023-01-01',
            status: 'pausado'
        }
    };

    render(
      <BrowserRouter>
        <CreateProject />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText('Nome do Projeto'), { target: { value: 'Projeto Atualizado' } });
    
    fireEvent.click(screen.getByText('Atualizar Projeto'));

    await waitFor(() => {
        expect(ProjectAPI.UpdateProject).toHaveBeenCalledWith('123', expect.objectContaining({
            title: 'Projeto Atualizado'
        }));
        expect(screen.getByTestId('toast')).toHaveTextContent('Projeto atualizado com sucesso!');
    });
  });
});