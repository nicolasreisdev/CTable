import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Home from './index';
import { BrowserRouter } from 'react-router-dom';

// Mocks dos estilos
vi.mock('./styles', () => ({
  HomePageContainer: ({ children }: any) => <div data-testid="home-container">{children}</div>,
  ContentWrapper: ({ children }: any) => <div>{children}</div>,
  SiteTitle: ({ children }: any) => <h1>{children}</h1>,
  Tagline: ({ children }: any) => <p>{children}</p>,
}));

// Mock do HeaderHome
vi.mock('../../components/layout/HeaderHome', () => ({
  default: () => <div data-testid="header-home">Header Mock</div>
}));

describe('Página Home', () => {
  it('deve renderizar o título, a tagline e o header', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    expect(screen.getByTestId('home-container')).toBeInTheDocument();
    expect(screen.getByTestId('header-home')).toBeInTheDocument();
    
    // Verifica o texto principal
    expect(screen.getByText('CTable')).toBeInTheDocument();
    expect(screen.getByText(/Descubra, compartilhe/i)).toBeInTheDocument();
  });
});