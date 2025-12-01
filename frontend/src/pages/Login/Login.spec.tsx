import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import LoginPage from './index';
import { BrowserRouter } from 'react-router-dom';

// --- Mocks ---
const navigateMock = vi.fn();
const loginMock = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return { ...actual, useNavigate: () => navigateMock };
});

vi.mock('../../API/AuthContext', () => ({
  useAuth: () => ({ login: loginMock })
}));

// Mock dos estilos do Form 
vi.mock('../../components/domain/Form/styles', () => ({
  FormPageContainer: ({ children }: any) => <div>{children}</div>,
  FormWrapper: ({ children }: any) => <div>{children}</div>,
  FormTitle: ({ children }: any) => <h1>{children}</h1>,
  StyledForm: ({ children, onSubmit }: any) => <form onSubmit={onSubmit}>{children}</form>,
  StyledInput: (props: any) => <input {...props} />, // Repassa as props (register do hook-form)
  SubmitButton: ({ children, disabled }: any) => <button type="submit" disabled={disabled}>{children}</button>,
  RedirectLink: ({ children }: any) => <div>{children}</div>,
}));

// Mock do Toast
vi.mock('../../components/common/Toast', () => ({
  default: ({ message }: any) => <div data-testid="toast">{message}</div>
}));

describe('Página Login', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve realizar login com sucesso e redirecionar', async () => {
    loginMock.mockResolvedValue({}); // Simula sucesso

    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );

    // Preenche o formulário
    fireEvent.change(screen.getByPlaceholderText('Email ou usuário'), { target: { value: 'user_teste' } });
    fireEvent.change(screen.getByPlaceholderText('Senha'), { target: { value: '123456' } });

    // Submete
    fireEvent.click(screen.getByText('Entrar'));

    await waitFor(() => {
      // Verifica se a função de login foi chamada com os dados corretos
      expect(loginMock).toHaveBeenCalledWith({ username: 'user_teste', senha: '123456' });
      // Verifica feedback visual
      expect(screen.getByTestId('toast')).toHaveTextContent('Usuário registrado com sucesso!');
    });
  });

  it('deve exibir erro se o login falhar', async () => {
    loginMock.mockRejectedValue(new Error('Credenciais inválidas')); // Simula erro

    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('Email ou usuário'), { target: { value: 'user_errado' } });
    fireEvent.change(screen.getByPlaceholderText('Senha'), { target: { value: '0000' } });
    fireEvent.click(screen.getByText('Entrar'));

    await waitFor(() => {
      expect(loginMock).toHaveBeenCalled();
      // Verifica se o Toast de erro apareceu
      expect(screen.getByTestId('toast')).toHaveTextContent('Credenciais inválidas');
      // Garante que NÃO navegou
      expect(navigateMock).not.toHaveBeenCalled();
    });
  });

  it('deve ter um link para cadastro', () => {
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );
    expect(screen.getByText('Cadastre-se').closest('a')).toHaveAttribute('href', '/register');
  });
});