import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Container principal do Header
export const HeaderContainer = styled.header`
    background: ${props => props.theme.background};
    backdrop-filter: blur(10px);
    height: 60px;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    
    display: flex;
    align-items: center;
    padding: 12px 24px;
    box-sizing: border-box;
    
    border-bottom: 1px solid ${props => props.theme.placeholder}20;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
    
    /* Efeito de barra colorida no topo */
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 2px;
        background: linear-gradient(90deg, 
            ${props => props.theme.keyword}, 
            ${props => props.theme.button},
            ${props => props.theme.keyword}
        );
        background-size: 200% 100%;
        animation: gradientFlow 4s ease infinite;
    }

    @keyframes gradientFlow {
        0%, 100% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
    }

    /* Efeito de glassmorphism */
    &::after {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(180deg, 
            ${props => props.theme.background}00 0%, 
            ${props => props.theme.background}05 100%
        );
        pointer-events: none;
    }
`;

// Container para os botões de ação à direita
export const ActionsContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    margin-left: auto;
    position: relative;
    z-index: 1;
`;

// Botão melhorado
export const Button = styled(Link)`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    background: transparent;
    border: 2px solid ${props => props.theme.button};
    border-radius: 24px;
    padding: 10px 24px;
    min-width: 100px;
    
    color: ${props => props.theme.button};
    text-decoration: none;
    font-weight: 600;
    font-size: 0.9rem;
    letter-spacing: 0.3px;
    
    position: relative;
    overflow: hidden;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    
    /* Efeito de brilho ao passar o mouse */
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, 
            transparent, 
            rgba(255, 255, 255, 0.2), 
            transparent
        );
        transition: left 0.5s ease;
    }

    /* Gradiente de fundo para o hover */
    &::after {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(135deg, 
            ${props => props.theme.button}, 
            ${props => props.theme['hover-button']}
        );
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: -1;
    }

    &:hover {
        color: ${props => props.theme.white};
        border-color: ${props => props.theme['hover-button']};
        transform: translateY(-2px);
        box-shadow: 0 4px 12px ${props => props.theme.button}40,
                    0 2px 4px ${props => props.theme.button}20;
        
        &::before {
            left: 100%;
        }
        
        &::after {
            opacity: 1;
        }
    }

    &:active {
        transform: translateY(0);
        box-shadow: 0 2px 8px ${props => props.theme.button}30;
    }

    /* Estilo especial para o botão de Register */
    &:last-child {
        background: linear-gradient(135deg, 
            ${props => props.theme.button}, 
            ${props => props.theme['hover-button']}
        );
        color: ${props => props.theme.white};
        border-color: transparent;
        box-shadow: 0 2px 8px ${props => props.theme.button}30;

        &::after {
            background: linear-gradient(135deg, 
                ${props => props.theme['hover-button']}, 
                ${props => props.theme.keyword}
            );
        }

        &:hover {
            box-shadow: 0 4px 16px ${props => props.theme.button}50,
                        0 2px 6px ${props => props.theme.button}30;
        }
    }
`;

// Logo/Brand (opcional, caso queira adicionar)
export const Logo = styled.div`
    font-size: 1.4rem;
    font-weight: 700;
    color: ${props => props.theme.white};
    background: linear-gradient(135deg, 
        ${props => props.theme.keyword}, 
        ${props => props.theme.button}
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    letter-spacing: -0.5px;
    cursor: pointer;
    transition: transform 0.2s ease;

    &:hover {
        transform: scale(1.05);
    }
`;