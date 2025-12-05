import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Container principal da Sidebar
export const SidebarContainer = styled.aside`
    width: 250px;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background-color: ${props => props.theme.sidebar};
    color: ${props => props.theme.white};
    padding: 16px;
    box-sizing: border-box;
    font-family: Arial, Helvetica, sans-serif;
    overflow-y: auto;
    z-index: 600;
`;

export const SidebarNav = styled.nav`
    display: flex;
    flex-direction: column;
`;

// Um componente de Link estilizado 
const BaseLink = styled(Link)`
    display: flex;
    align-items: center;
    text-decoration: none;
    color: ${props => props.theme['gray-300']};
    padding: 10px 8px;
    margin-bottom: 4px;
    border-radius: 6px;
    transition: background-color 0.2s ease-in-out;

    &:hover {
        background-color: ${props => props.theme['hover-button']};
        color: ${props => props.theme.white};
    }

    svg {
        margin-right: 12px;
    }
`;

// Link "Home" 
export const HomeLink = styled(BaseLink)`
    font-size: 18px;
    font-weight: 700;
    color: ${props => props.theme.white};
    margin-bottom: 20px;
`;

// Propriedades que o cabeçalho de comunidades aceita
interface CommunitiesHeaderProps {
    isOpen: boolean;
}

// Cabeçalho "COMUNIDADES" clicável
export const CommunitiesHeader = styled.div<CommunitiesHeaderProps>`
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    padding: 10px 8px;
    font-size: 11px;
    font-weight: 700;
    color: ${props => props.theme['gray-300']};
    letter-spacing: 0.5px;
    margin-bottom: 5px;

    &:hover {
        color: ${props => props.theme.white};
    }

    /* O ícone de seta */
    svg {
        transition: transform 0.2s ease-in-out;
        /* Gira o ícone com base na prop 'isOpen' */
        transform: ${(props) => (props.isOpen ? 'rotate(0deg)' : 'rotate(-90deg)')};
    }
`;

// Lista que agrupa os links das comunidades
export const CommunitiesList = styled.div`
    display: flex;
    flex-direction: column;
`;

// Link individual de cada comunidade
export const CommunityLink = styled(BaseLink)`
    /* Estilos específicos podem ser adicionados aqui se necessário */
`;

// Icone circular de cada comunidade
export const CommunityIcon = styled.img`
    width: 28px;
    height: 28px;
    border-radius: 50%;
    margin-right: 12px;
    object-fit: cover;
    background-color: ${props => props.theme['gray-300']};
`;