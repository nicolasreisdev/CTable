import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import HeaderHome from './index';
import { BrowserRouter } from 'react-router-dom';

// Mock dos estilos
vi.mock('./styles', () => ({
  HeaderContainer: ({ children }: { children: React.ReactNode }) => <header>{children}</header>,
  ActionsContainer: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Button: ({ children, to }: { children: React.ReactNode; to: string }) => <a href={to}>{children}</a>,
}));

describe('Componente HeaderHome', () => {
  it('deve renderizar os botões de Login e Register com os links corretos', () => {
    render(
      <BrowserRouter>
        <HeaderHome />
      </BrowserRouter>
    );

    const loginBtn = screen.getByText('Login');
    const registerBtn = screen.getByText('Register');

    expect(loginBtn).toBeInTheDocument();
    expect(loginBtn.closest('a')).toHaveAttribute('href', '/login');

    expect(registerBtn).toBeInTheDocument();
    expect(registerBtn.closest('a')).toHaveAttribute('href', '/register');
  });
});