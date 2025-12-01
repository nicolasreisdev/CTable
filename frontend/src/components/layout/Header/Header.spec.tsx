import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Header from './index';
import { BrowserRouter } from 'react-router-dom';

// Interface genérica para os estilos
interface StyleProps {
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler;
  to?: string;
}

// Mock dos estilos
vi.mock('./styles', () => ({
  HeaderContainer: ({ children }: StyleProps) => <header>{children}</header>,
  SearchContainer: ({ children }: StyleProps) => <div data-testid="search-container">{children}</div>,
  ActionsContainer: ({ children }: StyleProps) => <div>{children}</div>,
  CreateButton: ({ children, onClick }: StyleProps) => (
    <button onClick={onClick} data-testid="create-btn">{children}</button>
  ),
  ProfileIcon: ({ children, to }: StyleProps) => <a href={to}>{children}</a>,
}));

// Mock do componente Searchbar 
vi.mock('../../domain/Searchbar', () => ({
  default: () => <input data-testid="mock-searchbar" placeholder="Busca Mock" />
}));

describe('Componente Header', () => {
  it('deve renderizar a Searchbar e o ícone de perfil', () => {
    render(
      <BrowserRouter>
        <Header onCreateClick={() => {}} />
      </BrowserRouter>
    );

    expect(screen.getByTestId('mock-searchbar')).toBeInTheDocument();
    
    // Verifica link de perfil
    const profileLink = screen.getByRole('link'); 
    expect(profileLink).toHaveAttribute('href', '/profile');
    expect(screen.getByAltText('Foto de perfil')).toBeInTheDocument();
  });

  it('deve chamar a função onCreateClick ao clicar no botão Create', () => {
    const handleCreate = vi.fn();
    
    render(
      <BrowserRouter>
        <Header onCreateClick={handleCreate} />
      </BrowserRouter>
    );

    const createBtn = screen.getByTestId('create-btn');
    expect(createBtn).toHaveTextContent('Create');

    fireEvent.click(createBtn);

    expect(handleCreate).toHaveBeenCalledTimes(1);
  });
});