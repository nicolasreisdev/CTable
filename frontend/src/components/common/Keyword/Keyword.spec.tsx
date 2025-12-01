import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Keyword } from './index';

// Mock dos estilos
vi.mock('./styles', () => ({
  KeywordTag: ({ children }: any) => <div data-testid="keyword-tag">{children}</div>,
  KeywordRemoveButton: ({ children, onClick }: any) => (
    <button onClick={onClick} data-testid="remove-btn">
      {children}
    </button>
  ),
  KeywordContainer: ({ children }: any) => <div>{children}</div>
}));

describe('Componente Keyword', () => {
  it('deve renderizar o conteúdo corretamente', () => {
    const handleRemove = vi.fn();
    render(<Keyword onRemove={handleRemove}>React</Keyword>);

    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByTestId('keyword-tag')).toBeInTheDocument();
  });

  it('deve chamar a função onRemove ao clicar no botão', () => {
    const handleRemove = vi.fn();
    render(<Keyword onRemove={handleRemove}>TypeScript</Keyword>);

    const button = screen.getByTestId('remove-btn');
    fireEvent.click(button);

    expect(handleRemove).toHaveBeenCalledTimes(1);
  });
});