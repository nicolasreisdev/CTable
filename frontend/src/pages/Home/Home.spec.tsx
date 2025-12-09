import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Home from './index';
import { BrowserRouter } from 'react-router-dom';

interface StyleProps {
  children?: React.ReactNode;
}

vi.mock('./styles', () => ({
  HomePageContainer: ({ children }: StyleProps) => <div data-testid="home-container">{children}</div>,
  ContentWrapper: ({ children }: StyleProps) => <div>{children}</div>,
  SiteTitle: ({ children }: StyleProps) => <h1>{children}</h1>,
  Tagline: ({ children }: StyleProps) => <p>{children}</p>,
}));

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