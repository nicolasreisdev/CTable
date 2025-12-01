import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from './App';

// --- Mocks ---
vi.mock('./Router', () => ({
  Router: () => <div data-testid="app-router">Router Content</div>
}));

vi.mock('./styles/global', () => ({
  GlobalStyle: () => <div data-testid="global-style" />
}));

vi.mock('./styles/themes/default', () => ({
  defaultTheme: { 
    colors: { background: '#fff' } 
  }
}));

describe('Componente App', () => {
  it('deve renderizar a estrutura principal corretamente', () => {
    render(<App />);

    // Verifica se o componente Router foi renderizado dentro do App
    expect(screen.getByTestId('app-router')).toBeInTheDocument();
    expect(screen.getByText('Router Content')).toBeInTheDocument();
  });

  it('deve injetar os estilos globais', () => {
    render(<App />);
    
    // Verifica se o componente de estilos globais está presente na árvore
    expect(screen.getByTestId('global-style')).toBeInTheDocument();
  });
});