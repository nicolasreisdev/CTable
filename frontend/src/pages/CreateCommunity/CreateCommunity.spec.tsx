import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import CreateCommunity from './index';
import { BrowserRouter } from 'react-router-dom';
import * as CommunityAPI from '../../API/Community';
import * as KeywordsAPI from '../../API/Keywords';

// --- Mocks ---
const navigateMock = vi.fn();
let mockLocationState: unknown = null;

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => navigateMock,
    useLocation: () => ({ state: mockLocationState }),
  };
});

vi.mock('../../API/Community', () => ({
    NewCommunity: vi.fn(),
    UpdateCommunity: vi.fn(),
}));

vi.mock('../../API/Keywords', () => ({
  GetKeywords: vi.fn(),
}));

vi.mock('../../components/layout/Sidebar', () => ({ default: () => <div /> }));
vi.mock('../../components/common/Toast', () => ({ default: ({ message }: { message: string }) => <div data-testid="toast">{message}</div> }));
vi.mock('../../components/domain/TagInput', () => ({
    default: ({ onChange, value }: { onChange: (val: string[]) => void; value: string[] }) => (
      <input 
        data-testid="tag-input-mock" 
        value={value ? value.join(',') : ''} 
        onChange={(e) => onChange(e.target.value ? e.target.value.split(',') : [])} 
      />
    )
}));

describe('Página CreateCommunity', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockLocationState = null;
    vi.spyOn(KeywordsAPI, 'GetKeywords').mockResolvedValue([]);
  });

  it('deve criar uma nova comunidade com sucesso', async () => {
    render(
      <BrowserRouter>
        <CreateCommunity />
      </BrowserRouter>
    );

    expect(screen.getByText('Criar Comunidade', { selector: 'h2' })).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText('Nome da Comunidade'), { target: { value: 'Devs BR' } });
    fireEvent.change(screen.getByLabelText('Descrição do Projeto'), { target: { value: 'Comunidade de teste' } });

    // Simula adição de tags via mock
    fireEvent.change(screen.getByTestId('tag-input-mock'), { target: { value: 'Java,Spring' } });

    fireEvent.click(screen.getByText('Criar Comunidade', { selector: 'button' }));

    await waitFor(() => {
        expect(CommunityAPI.NewCommunity).toHaveBeenCalledWith(expect.objectContaining({
            name: 'Devs BR',
            description: 'Comunidade de teste',
            technologies: ['Java', 'Spring']
        }));
        expect(screen.getByTestId('toast')).toHaveTextContent('Comunidade criada com sucesso!');
    });
  });

  it('deve editar uma comunidade existente', async () => {
    mockLocationState = {
        communityToEdit: {
            communityID: '999',
            name: 'Nome Antigo',
            description: 'Desc Antiga',
            technologies: []
        }
    };

    render(
      <BrowserRouter>
        <CreateCommunity />
      </BrowserRouter>
    );

    expect(screen.getByText('Editar Comunidade')).toBeInTheDocument();
    
    // Altera nome
    fireEvent.change(screen.getByLabelText('Nome da Comunidade'), { target: { value: 'Nome Novo' } });

    fireEvent.click(screen.getByText('Salvar Alterações'));

    await waitFor(() => {
        expect(CommunityAPI.UpdateCommunity).toHaveBeenCalledWith('999', expect.objectContaining({
            name: 'Nome Novo'
        }));
        expect(screen.getByTestId('toast')).toHaveTextContent('Comunidade atualizada com sucesso!');
    });
  });
});