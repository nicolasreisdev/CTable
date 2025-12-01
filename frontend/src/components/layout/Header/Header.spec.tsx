import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Header from './index';
import { BrowserRouter } from 'react-router-dom';

// Mock dos estilos
vi.mock('./styles', () => ({
  HeaderContainer: ({ children }: any) => <header>{children}</header>,
  SearchContainer: ({ children }: any) => <div data-testid="search-container">{children}</div>,
  ActionsContainer: ({ children }: any) => <div>{children}</div>,
  CreateButton: ({ children, onClick }: any) => (
    <button onClick={onClick} data-testid="create-btn">{children}</button>
  ),
  ProfileIcon: ({ children, to }: any) => <a href={to}>{children}</a>,
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