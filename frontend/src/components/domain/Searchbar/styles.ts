import styled from 'styled-components';

// Container principal do searchbar
export const SearchWrapper = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    
    background-color: ${props => props.theme['gray-100']};
    
    border: 2px solid transparent;
    
    border-radius: 12px; 
    
    padding: 12px 20px;
    width: 100%; 
    box-sizing: border-box; 
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
    
    transition: all 0.3s ease;

    &:focus-within {
        border-color: ${props => props.theme.button};
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08), 
                    0 0 0 3px ${props => props.theme.button}22;
        transform: translateY(-1px);
    }

    &:hover {
        box-shadow: 0 3px 12px rgba(0, 0, 0, 0.06);
    }

    /* Estilização do ícone de lupa (FiSearch) */
    svg {
        color: ${props => props.theme['gray-500']}; 
        margin-right: 12px; 
        flex-shrink: 0;
        transition: color 0.2s ease;
    }

    &:focus-within svg {
        color: ${props => props.theme.button};
    }
`;

// O campo de <input>
export const SearchInput = styled.input`
    flex-grow: 1; 
    border: none;
    background: transparent;
    outline: none;
    font-size: 15px;
    color: ${props => props.theme.title};
    width: 100%;
    font-weight: 400;

    &::placeholder {
        color: ${props => props.theme.placeholder};
        font-weight: 400;
    }
`;

export const ResultsDropdown = styled.div`
    position: absolute;
    top: calc(100% + 4px);
    left: 0;
    right: 0;
    
    background-color: ${props => props.theme.white || '#FFF'};
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12),
                0 2px 8px rgba(0, 0, 0, 0.08);
    border: 1px solid ${props => props.theme.placeholder}15;
    
    max-height: 420px;
    overflow-y: auto;
    overflow-x: hidden;
    z-index: 1000;
    
    animation: slideDown 0.2s ease-out;

    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateY(-8px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    /* Estilização da scrollbar */
    &::-webkit-scrollbar {
        width: 8px;
    }

    &::-webkit-scrollbar-track {
        background: transparent;
    }

    &::-webkit-scrollbar-thumb {
        background: ${props => props.theme['gray-300']};
        border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb:hover {
        background: ${props => props.theme['gray-400']};
    }
`;

export const ResultSection = styled.div`
    padding: 16px 12px 12px;
    
    &:not(:first-child) {
        border-top: 1px solid ${props => props.theme['gray-100']};
        margin-top: 8px;
        padding-top: 16px;
    }
    
    h4 {
        font-size: 0.7rem;
        text-transform: uppercase;
        color: ${props => props.theme['gray-400']};
        margin-bottom: 8px;
        margin-left: 8px;
        font-weight: 600;
        letter-spacing: 0.8px;
    }
`;

export const ResultItem = styled.button`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 12px 16px;
    border: none;
    background: none;
    text-align: left;
    cursor: pointer;
    transition: all 0.2s ease;
    border-radius: 10px;
    margin: 2px 0;
    position: relative;
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 3px;
        background: ${props => props.theme.button};
        transform: scaleY(0);
        transition: transform 0.2s ease;
    }

    &:hover {
        background-color: ${props => props.theme['gray-500'] || props.theme['gray-100']};
        transform: translateX(4px);
        
        &::before {
            transform: scaleY(1);
        }
    }

    &:active {
        transform: translateX(2px);
        background-color: ${props => props.theme['gray-100']};
    }

    span {
        font-size: 0.95rem;
        color: ${props => props.theme.title};
        font-weight: 500;
        line-height: 1.4;
    }
    
    small {
        color: ${props => props.theme['gray-400']};
        font-size: 0.8rem;
        font-weight: 400;
        white-space: nowrap;
        padding: 4px 10px;
        background: ${props => props.theme['gray-100']};
        border-radius: 6px;
        margin-left: 12px;
    }
`;

export const NoResults = styled.div`
    padding: 32px 20px;
    text-align: center;
    color: ${props => props.theme['gray-400']};
    font-size: 0.9rem;
    font-weight: 400;
    
    &::before {
        content: '🔍';
        display: block;
        font-size: 2rem;
        margin-bottom: 12px;
        opacity: 0.5;
    }
`;