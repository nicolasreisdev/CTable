import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Container principal do Header
export const HeaderContainer = styled.header`
    background-color: ${props => props.theme.background};
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
`;

// Container para os botões de ação à direita
export const ActionsContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 16px; 
    margin-left: auto;
`;

// Botão "Create"
export const Button = styled(Link)`
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
