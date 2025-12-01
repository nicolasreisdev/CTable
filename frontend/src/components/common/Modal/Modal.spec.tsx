import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Modal from './index';

// Mock dos estilos
vi.mock('./styles', () => ({
  ModalOverlay: ({ children, onClick }: any) => (
    <div data-testid="overlay" onClick={onClick}>
      {children}
    </div>
  ),
  ModalContent: ({ children, onClick }: any) => (
    <div data-testid="content" onClick={onClick}>
      {children}
    </div>
  ),
  CloseButton: ({ children, onClick }: any) => (
    <button data-testid="close-btn" onClick={onClick}>
      {children}
    </button>
  ),
  ModalTitle: ({ children }: any) => <h1>{children}</h1>,
}));

describe('Componente Modal', () => {
  it('não deve renderizar nada se isOpen for false', () => {
    render(
      <Modal isOpen={false} onClose={() => {}} title="Teste">
        <p>Conteúdo</p>
      </Modal>
    );

    expect(screen.queryByTestId('overlay')).not.toBeInTheDocument();
  });

  it('deve renderizar o título e o conteúdo se isOpen for true', () => {
    render(
      <Modal isOpen={true} onClose={() => {}} title="Título do Modal">
        <p>Conteúdo Interno</p>
      </Modal>
    );

    expect(screen.getByText('Título do Modal')).toBeInTheDocument();
    expect(screen.getByText('Conteúdo Interno')).toBeInTheDocument();
  });

  it('deve fechar ao clicar no botão de fechar (X)', () => {
    const handleClose = vi.fn();
    render(
      <Modal isOpen={true} onClose={handleClose} title="Teste">
        Conteúdo
      </Modal>
    );

    fireEvent.click(screen.getByTestId('close-btn'));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('deve fechar ao clicar no overlay (fundo escuro)', () => {
    const handleClose = vi.fn();
    render(
      <Modal isOpen={true} onClose={handleClose} title="Teste">
        Conteúdo
      </Modal>
    );

    fireEvent.click(screen.getByTestId('overlay'));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('NÃO deve fechar ao clicar dentro do conteúdo (stop propagation)', () => {
    const handleClose = vi.fn();
    render(
      <Modal isOpen={true} onClose={handleClose} title="Teste">
        Conteúdo
      </Modal>
    );

    // Clica no cartão do modal (conteúdo)
    fireEvent.click(screen.getByTestId('content'));
    
    // A função de fechar NÃO deve ser chamada
    expect(handleClose).not.toHaveBeenCalled();
  });
});