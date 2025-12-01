import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import Toast from './index';

// Mock dos estilos
vi.mock('./styles', () => ({
  ToastContainer: ({ children, type }: { children: React.ReactNode; type: string }) => (
    <div data-testid="toast-container" data-type={type}>
      {children}
    </div>
  ),
  ToastMessage: ({ children }: { children: React.ReactNode }) => <p>{children}</p>,
  CloseButton: ({ children, onClick }: { children: React.ReactNode; onClick: React.MouseEventHandler }) => (
    <button onClick={onClick} data-testid="close-btn">
      {children}
    </button>
  ),
}));

describe('Componente Toast', () => {
  beforeEach(() => {
    vi.useFakeTimers(); // Ativa temporizadores falsos
  });

  afterEach(() => {
    vi.useRealTimers(); // Restaura temporizadores reais após cada teste
  });

  it('deve renderizar a mensagem e o tipo correto', () => {
    render(<Toast message="Sucesso!" type="success" onClose={() => {}} />);

    expect(screen.getByText('Sucesso!')).toBeInTheDocument();
    
    const container = screen.getByTestId('toast-container');
    expect(container).toHaveAttribute('data-type', 'success');
  });

  it('deve chamar onClose ao clicar no botão de fechar', () => {
    const handleClose = vi.fn();
    render(<Toast message="Erro!" type="error" onClose={handleClose} />);

    fireEvent.click(screen.getByTestId('close-btn'));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('deve fechar automaticamente após 5 segundos', () => {
    const handleClose = vi.fn();
    render(<Toast message="Auto close" type="success" onClose={handleClose} />);

    // Verifica que ainda não foi chamado
    expect(handleClose).not.toHaveBeenCalled();

    // Avança o tempo em 5000ms (5 segundos)
    act(() => {
      vi.advanceTimersByTime(5000);
    });

    // Agora deve ter sido chamado
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
  
  it('não deve fechar antes de 5 segundos', () => {
    const handleClose = vi.fn();
    render(<Toast message="Wait" type="success" onClose={handleClose} />);

    // Avança apenas 4 segundos
    act(() => {
      vi.advanceTimersByTime(4000);
    });

    expect(handleClose).not.toHaveBeenCalled();
  });
});