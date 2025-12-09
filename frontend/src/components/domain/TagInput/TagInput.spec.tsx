import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import TagInput from './'; 

// Mock dos estilos
vi.mock('../CreationForm/styles', () => ({
  SearchWrapper: ({ children, ref }: { children: React.ReactNode; ref: React.Ref<HTMLDivElement> }) => <div ref={ref} data-testid="wrapper">{children}</div>,
  Input: (props: React.InputHTMLAttributes<HTMLInputElement>) => <input data-testid="tag-input" {...props} />,
  SearchResultsList: ({ children }: { children: React.ReactNode }) => <ul data-testid="results-list">{children}</ul>,
  SearchResultItem: ({ children, onClick }: { children: React.ReactNode; onClick: React.MouseEventHandler }) => <li onClick={onClick}>{children}</li>,
  ErrorMessage: ({ children }: { children: React.ReactNode }) => <span>{children}</span>,
}));

// Mock do componente Keyword 
vi.mock('../../common/Keyword', () => ({
  KeywordContainer: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Keyword: ({ children, onRemove }: { children: React.ReactNode; onRemove: () => void }) => (
    <span data-testid="keyword">
      {children}
      <button onClick={onRemove} data-testid={`remove-${children}`}>X</button>
    </span>
  ),
}));

describe('Componente TagInput', () => {
  const mockOnChange = vi.fn();
  const searchList = ['React', 'TypeScript', 'Node.js', 'Vitest'];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve renderizar corretamente e exibir tags selecionadas', () => {
    render(
      <TagInput 
        value={['React']} 
        onChange={mockOnChange} 
        searchList={searchList} 
        limit={5} 
        placeholder="Busque tags" 
      />
    );

    expect(screen.getByTestId('tag-input')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
  });

  it('deve filtrar a lista ao digitar', () => {
    render(
      <TagInput 
        value={[]} 
        onChange={mockOnChange} 
        searchList={searchList} 
        limit={5} 
        placeholder="Busque tags" 
      />
    );

    const input = screen.getByTestId('tag-input');
    fireEvent.change(input, { target: { value: 'Type' } });

    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.queryByText('Node.js')).not.toBeInTheDocument();
  });

  it('deve adicionar uma tag ao clicar no resultado', () => {
    render(
      <TagInput 
        value={[]} 
        onChange={mockOnChange} 
        searchList={searchList} 
        limit={5} 
        placeholder="Busque tags" 
      />
    );

    const input = screen.getByTestId('tag-input');
    fireEvent.change(input, { target: { value: 'Node' } });
    
    const resultItem = screen.getByText('Node.js');
    fireEvent.click(resultItem);

    // Verifica se a função onChange foi chamada com a nova lista
    expect(mockOnChange).toHaveBeenCalledWith(['Node.js']);
  });

  it('deve remover uma tag ao clicar no botão de remover', () => {
    render(
      <TagInput 
        value={['React', 'Vitest']} 
        onChange={mockOnChange} 
        searchList={searchList} 
        limit={5} 
        placeholder="Busque tags" 
      />
    );

    const removeBtn = screen.getByTestId('remove-React');
    fireEvent.click(removeBtn);

    // Deve chamar onChange com a lista filtrada 
    expect(mockOnChange).toHaveBeenCalledWith(['Vitest']);
  });

  it('deve mostrar erro ao atingir o limite', () => {
    render(
      <TagInput 
        value={['A', 'B']} 
        onChange={mockOnChange} 
        searchList={['A', 'B', 'C']} 
        limit={2} 
        placeholder="Busque tags" 
      />
    );

    const input = screen.getByTestId('tag-input');
    fireEvent.change(input, { target: { value: 'C' } });
    
    const resultItem = screen.getByText('C');
    fireEvent.click(resultItem);

    expect(screen.getByText('Limite de 2 itens atingido.')).toBeInTheDocument();
    expect(mockOnChange).not.toHaveBeenCalled(); // Não deve adicionar
  });
});