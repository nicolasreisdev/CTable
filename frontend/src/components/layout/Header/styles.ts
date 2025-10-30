import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Container principal do Header
export const HeaderContainer = styled.header`
    background-color: transparent;
    height: 60px;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    
    display: flex;
    align-items: center;
    padding-top: 12px;
    padding-bottom: 12px;
    padding-right: 24px;
    box-sizing: border-box; 
    
    /* Deixa espaço para a SideBar fixa */
    padding-left: calc(250px + 24px); 
`;

// Container para centralizar a barra de pesquisa
export const SearchContainer = styled.div`
    flex-grow: 1;
    max-width: 600px;
    margin: 0 auto;
`;

// Container para os botões de ação à direita
export const ActionsContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 16px; 
    margin-left: 24px;
`;

// Botão "Create"
export const CreateButton = styled(Link)`
    display: flex;
    align-items: center;
    gap: 4px;
    background-color: transparent;
    border: 1px solid ${props => props.theme.button};
    border-radius: 9999px; /* Formato de elipse */
    padding: 8px 16px;
    
    color: ${props => props.theme.button};
    text-decoration: none;
    font-weight: 600;
    font-size: 14px;
    transition: all 0.2s ease;

    &:hover {
        background-color: ${props => props.theme['hover-button']};
        border-color: ${props => props.theme['hover-button']};
    }
`;

// Ícone de Perfil
export const ProfileIcon = styled(Link)`
    width: 32px;
    height: 32px;
    border-radius: 50%;
    overflow: hidden;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;