import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import EditProfile from './index';
import { BrowserRouter } from 'react-router-dom';
import * as UserAPI from '../../API/User';

// --- Mocks ---
const navigateMock = vi.fn();
const updateUserMock = vi.fn();

// Mock do usuário atual logado
const mockCurrentUser = {
  nomeCompleto: 'João Silva',
  username: 'joaosilva',
  email: 'joao@email.com',
  phone: '1199999999',
  birthDate: '1990-01-01T00:00:00.000Z'
};

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return { ...actual, useNavigate: () => navigateMock };
});

vi.mock('../../API/User', () => ({
  UpdateProfile: vi.fn()
}));

vi.mock('../../API/AuthContext', () => ({
  useAuth: () => ({
    currentUser: mockCurrentUser,
    updateUser: updateUserMock
  })
}));

// Mocks Visuais
vi.mock('../../components/layout/Sidebar', () => ({ default: () => <div /> }));
vi.mock('../../components/common/Toast', () => ({ default: ({ message }: { message: string }) => <div data-testid="toast">{message}</div> }));

// Mock dos estilos de formulário 
interface FormStyleProps {
  children?: React.ReactNode;
  onSubmit?: React.FormEventHandler;
  htmlFor?: string;
}

vi.mock('../../components/domain/CreationForm/styles', () => ({
  FormContainer: ({ children, onSubmit }: FormStyleProps) => <form onSubmit={onSubmit}>{children}</form>,
  InputGroup: ({ children }: FormStyleProps) => <div>{children}</div>,
  Label: ({ children, htmlFor }: FormStyleProps) => <label htmlFor={htmlFor}>{children}</label>,
  Input: (props: React.InputHTMLAttributes<HTMLInputElement>) => <input {...props} />,
  SubmitButton: ({ children }: FormStyleProps) => <button type="submit">{children}</button>,
}));

describe('Página EditProfile', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve preencher o formulário com os dados atuais do usuário', () => {
    render(
      <BrowserRouter>
        <EditProfile />
      </BrowserRouter>
    );

    // Verifica valores iniciais
    expect(screen.getByLabelText('Nome Completo')).toHaveValue('João Silva');
    expect(screen.getByLabelText('Nome de Usuário')).toHaveValue('joaosilva');
    expect(screen.getByLabelText('Email')).toHaveValue('joao@email.com');
    // A data é formatada para YYYY-MM-DD no componente
    expect(screen.getByLabelText('Data de Nascimento')).toHaveValue('1990-01-01');
  });

  it('deve atualizar o perfil com sucesso', async () => {
    vi.spyOn(UserAPI, 'UpdateProfile').mockResolvedValue({} as unknown as void);

    render(
      <BrowserRouter>
        <EditProfile />
      </BrowserRouter>
    );

    // Altera um campo
    fireEvent.change(screen.getByLabelText('Nome Completo'), { target: { value: 'João da Silva Editado' } });

    // Submete
    fireEvent.click(screen.getByText('Salvar Alterações'));

    await waitFor(() => {
      // Verifica API
      expect(UserAPI.UpdateProfile).toHaveBeenCalledWith(expect.objectContaining({
        nomeCompleto: 'João da Silva Editado',
        username: 'joaosilva' // Campo não alterado mantém valor
      }));

      // Verifica Contexto
      expect(updateUserMock).toHaveBeenCalled();

      // Verifica Toast
      expect(screen.getByTestId('toast')).toHaveTextContent('Perfil atualizado com sucesso!');
    });
  });

  it('deve exibir erro se a atualização falhar', async () => {
    vi.spyOn(UserAPI, 'UpdateProfile').mockRejectedValue(new Error('Erro ao atualizar'));

    render(
      <BrowserRouter>
        <EditProfile />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText('Salvar Alterações'));

    await waitFor(() => {
      expect(screen.getByTestId('toast')).toHaveTextContent('Erro ao atualizar');
      expect(navigateMock).not.toHaveBeenCalled();
    });
  });
});