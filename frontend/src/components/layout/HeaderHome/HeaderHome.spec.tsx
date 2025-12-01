import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import HeaderHome from './index';
import { BrowserRouter } from 'react-router-dom';

// Mock dos estilos
vi.mock('./styles', () => ({
  HeaderContainer: ({ children }: any) => <header>{children}</header>,
  ActionsContainer: ({ children }: any) => <div>{children}</div>,
  // Simulando o componente Button (que é um Link)
  Button: ({ children, to }: any) => <a href={to}>{children}</a>,
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