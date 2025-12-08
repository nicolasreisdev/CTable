import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Register from './index';
import { BrowserRouter } from 'react-router-dom';
import * as AuthAPI from '../../API/Auth';

const navigateMock = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return { ...actual, useNavigate: () => navigateMock };
});

vi.mock('../../API/Auth', () => ({
  Register: vi.fn(),
}));

interface MockStyleProps {
  children?: React.ReactNode;
  onSubmit?: React.FormEventHandler;
  disabled?: boolean;
}

vi.mock('../../components/domain/Form/styles', () => ({
  FormPageContainer: ({ children }: MockStyleProps) => <div>{children}</div>,
  FormWrapper: ({ children }: MockStyleProps) => <div>{children}</div>,
  FormTitle: ({ children }: MockStyleProps) => <h1>{children}</h1>,
  StyledForm: ({ children, onSubmit }: MockStyleProps) => <form onSubmit={onSubmit}>{children}</form>,
  StyledInput: (props: React.InputHTMLAttributes<HTMLInputElement>) => <input {...props} />, 
  SubmitButton: ({ children, disabled }: MockStyleProps) => <button type="submit" disabled={disabled}>{children}</button>,
  RedirectLink: ({ children }: MockStyleProps) => <div>{children}</div>,
}));

vi.mock('../../components/common/Toast', () => ({
  default: ({ message }: { message: string }) => <div data-testid="toast">{message}</div>
}));

describe('Página Register', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve registrar um novo usuário com sucesso', async () => {
    vi.spyOn(AuthAPI, 'Register').mockResolvedValue({} as unknown as void);

    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('Nome completo'), { target: { value: 'Fulano' } });
    fireEvent.change(screen.getByPlaceholderText('Nome de usuário (user)'), { target: { value: 'fulano' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'fulano@test.com' } });
    fireEvent.change(screen.getByPlaceholderText('Senha'), { target: { value: '123456' } });
    fireEvent.change(screen.getByPlaceholderText('Telefone'), { target: { value: '99999999' } });
    fireEvent.change(screen.getByPlaceholderText('Data de nascimento'), { target: { value: '01/01/2000' } });

    fireEvent.click(screen.getByText('Cadastrar'));

    await waitFor(() => {
        expect(AuthAPI.Register).toHaveBeenCalledWith(expect.objectContaining({
            nomeCompleto: 'Fulano',
            username: 'fulano',
            email: 'fulano@test.com'
        }));
        expect(screen.getByTestId('toast')).toHaveTextContent('Usuário registrado com sucesso!');
    });
  });

  it('deve exibir erro se o registro falhar', async () => {
    vi.spyOn(AuthAPI, 'Register').mockRejectedValue(new Error('Email já existe'));

    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('Nome completo'), { target: { value: 'Fulano' } });
    fireEvent.change(screen.getByPlaceholderText('Nome de usuário (user)'), { target: { value: 'fulano' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'fulano@test.com' } });
    fireEvent.change(screen.getByPlaceholderText('Senha'), { target: { value: '123456' } });
    fireEvent.change(screen.getByPlaceholderText('Telefone'), { target: { value: '99999999' } });
    fireEvent.change(screen.getByPlaceholderText('Data de nascimento'), { target: { value: '01/01/2000' } });

    fireEvent.click(screen.getByText('Cadastrar'));

    await waitFor(() => {
        expect(screen.getByTestId('toast')).toHaveTextContent('Email já existe');
        expect(navigateMock).not.toHaveBeenCalled();
    });
  });
});