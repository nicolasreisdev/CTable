import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Container principal do Header
export const HeaderContainer = styled.header`
    background: ${props => props.theme.background}f5;
    backdrop-filter: blur(12px);
    height: 60px;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 500;
    
    display: flex;
    align-items: center;
    padding: 12px 24px 12px calc(250px + 24px);
    box-sizing: border-box;
    
    border-bottom: 1px solid ${props => props.theme.placeholder}15;
    box-shadow: 0 2px 16px rgba(0, 0, 0, 0.08),
                0 1px 4px rgba(0, 0, 0, 0.04);
    

    @keyframes shimmer {
        0%, 100% { background-position: -200% 0; }
        50% { background-position: 200% 0; }
    }

    @media (max-width: 768px) {
        padding-left: 24px;
    }
`;

// Container para centralizar a barra de pesquisa
export const SearchContainer = styled.div`
    flex-grow: 1;
    max-width: 580px;
    margin: 0 auto;
    position: relative;
    
    /* Efeito de foco expandido */
    &:focus-within {
        transform: scale(1.02);
        transition: transform 0.2s ease;
    }

    @media (max-width: 1024px) {
        max-width: 450px;
    }

    @media (max-width: 768px) {
        max-width: 100%;
    }
`;

// Container para os botões de ação à direita
export const ActionsContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    margin-left: 24px;
    position: relative;

    @media (max-width: 768px) {
        gap: 8px;
        margin-left: 12px;
    }
`;

// Botão "Create"
export const CreateButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    background: linear-gradient(135deg, 
        ${props => props.theme.button}, 
        ${props => props.theme['hover-button']}
    );
    border: none;
    border-radius: 24px;
    padding: 10px 20px;
    
    color: ${props => props.theme.white};
    font-weight: 600;
    font-size: 0.9rem;
    letter-spacing: 0.3px;
    cursor: pointer;
    
    position: relative;
    overflow: hidden;
    box-shadow: 0 2px 8px ${props => props.theme.button}40,
                0 1px 3px ${props => props.theme.button}20;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    
    /* Ícone com transição */
    svg {
        transition: transform 0.3s ease;
    }

    /* Efeito de shimmer */
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, 
            transparent, 
            rgba(255, 255, 255, 0.3), 
            transparent
        );
        transition: left 0.5s ease;
    }

    /* Gradiente de hover */
    &::after {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(135deg, 
            ${props => props.theme['hover-button']}, 
            ${props => props.theme.keyword}
        );
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: -1;
    }

    &:hover {
        transform: translateY(-2px) scale(1.02);
        box-shadow: 0 4px 16px ${props => props.theme.button}50,
                    0 2px 8px ${props => props.theme.button}30;
        
        svg {
            transform: rotate(90deg);
        }
        
        &::before {
            left: 100%;
        }
        
        &::after {
            opacity: 1;
        }
    }

    &:active {
        transform: translateY(0) scale(0.98);
        box-shadow: 0 2px 8px ${props => props.theme.button}40;
    }

    @media (max-width: 768px) {
        padding: 8px 16px;
        font-size: 0.85rem;
        gap: 4px;
        
        /* Esconde o texto em telas pequenas, mantém apenas o ícone */
        span {
            display: none;
        }
    }
`;

// Ícone de Perfil 
export const ProfileIcon = styled(Link)`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
    position: relative;
    
    border: 2px solid ${props => props.theme.placeholder}30;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15),
                0 0 0 3px ${props => props.theme.keyword}00;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    
    /* Efeito de anel ao redor */
    &::before {
        content: '';
        position: absolute;
        inset: -3px;
        border-radius: 50%;
        background: linear-gradient(135deg, 
            ${props => props.theme.keyword}, 
            ${props => props.theme.button}
        );
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: -1;
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
        background-color: ${props => props.theme.placeholder}40;
    }

    /* Fallback para imagem vazia */
    &::after {
        content: '👤';
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        background: linear-gradient(135deg, 
            ${props => props.theme.button}30, 
            ${props => props.theme.keyword}30
        );
        opacity: 0;
        transition: opacity 0.3s ease;
    }

    /* Mostra o fallback se a imagem não carregar */
    img[src=""], img:not([src]) {
        opacity: 0;
    }

    img[src=""] ~ &::after, 
    img:not([src]) ~ &::after {
        opacity: 1;
    }

    &:hover {
        transform: translateY(-2px) scale(1.05);
        border-color: ${props => props.theme.keyword};
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2),
                    0 0 0 3px ${props => props.theme.keyword}30;
        
        &::before {
            opacity: 1;
        }

        img {
            transform: scale(1.1);
        }
    }

    &:active {
        transform: translateY(0) scale(1);
    }

    @media (max-width: 768px) {
        width: 36px;
        height: 36px;
    }
`;

// Badge de notificação 
export const NotificationBadge = styled.span`
    position: absolute;
    top: -4px;
    right: -4px;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: linear-gradient(135deg, #ff4757, #ff6348);
    border: 2px solid ${props => props.theme.background};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.65rem;
    font-weight: 700;
    color: white;
    box-shadow: 0 2px 6px rgba(255, 71, 87, 0.4);
    animation: pulse 2s ease-in-out infinite;

    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
    }
`;