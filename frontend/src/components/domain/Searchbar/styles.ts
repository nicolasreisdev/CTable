import styled from 'styled-components';

// Container principal do searchbar
export const SearchWrapper = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    
    background-color: ${props => props.theme['gray-100']};
    
    border: 1px solid ${props => props.theme.button};
    
    border-radius: 9999px; 
    
    padding: 8px 16px;
    width: 100%; 
    box-sizing: border-box; 
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);

    /* Estilização do ícone de lupa (FiSearch) */
    svg {
        color: ${props => props.theme['gray-500']}; 
        margin-right: 8px; 
        flex-shrink: 0; 
    }
`;

// O campo de <input>
export const SearchInput = styled.input`
    flex-grow: 1; 
    border: none;
    background: transparent;
    outline: none;
    font-size: 16px;
    color: ${props => props.theme.placeholder};
    width: 100%; /* Garante que o input preencha o espaço */

    &::placeholder {
        color: ${props => props.theme.placeholder};
    }
`;

export const ResultsDropdown = styled.div`
    position: absolute;
    top: 100%; /* Logo abaixo da barra */
    left: 0;
    right: 0;
    margin-top: 8px;
    
    background-color: ${props => props.theme.white || '#FFF'};
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    border: 1px solid ${props => props.theme.placeholder}33;
    
    max-height: 400px;
    overflow-y: auto;
    z-index: 1000; /* Garante que fique por cima de tudo */
    padding: 8px 0;
`;

export const ResultSection = styled.div`
    padding: 8px 16px;
    
    h4 {
        font-size: 0.75rem;
        text-transform: uppercase;
        color: ${props => props.theme['gray-500']};
        margin-bottom: 8px;
        font-weight: 700;
        letter-spacing: 0.5px;
    }
`;

export const ResultItem = styled.button`
    display: flex;
    align-items: center;
    width: 100%;
    padding: 10px 16px;
    border: none;
    background: none;
    text-align: left;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
        background-color: ${props => props.theme['gray-100']};
    }

    span {
        font-size: 0.95rem;
        color: ${props => props.theme.title};
        font-weight: 500;
    }
    
    small {
        margin-left: auto;
        color: ${props => props.theme['gray-400']};
        font-size: 0.8rem;
    }
`;

export const NoResults = styled.div`
    padding: 16px;
    text-align: center;
    color: ${props => props.theme['gray-500']};
    font-size: 0.9rem;
`;