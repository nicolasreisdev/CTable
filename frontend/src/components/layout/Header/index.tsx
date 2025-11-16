import React from 'react';
import { FiPlus } from 'react-icons/fi';
import Searchbar from '../../domain/Searchbar';
import * as S from './styles';

// --- DADOS MOCKADOS ---
const mockUser = {
    username: 'cecilia',
    avatarUrl: 'https://i.pravatar.cc/150?img=32' // Avatar de exemplo
};
// ----------------------------------------------------

interface HeaderProps {
    onCreateClick: () => void; 
}

export default function Header({ onCreateClick }: HeaderProps) {
    return (
        <S.HeaderContainer>
            {/* 1. Barra de Pesquisa */}
            <S.SearchContainer>
                <Searchbar />
            </S.SearchContainer>

            {/* 2. Ações do Usuário */}
            <S.ActionsContainer>
                {/* Botão "Create" */}
                <S.CreateButton onClick={onCreateClick}> 
                    <FiPlus size={20} />
                    Create
                </S.CreateButton>

                {/* Ícone de Perfil */}
                <S.ProfileIcon to={`/profile`}> {/* Redireciona para o perfil */}
                    <img src={mockUser.avatarUrl} alt="Foto de perfil" />
                </S.ProfileIcon>
            </S.ActionsContainer>
        </S.HeaderContainer>
    );
}

