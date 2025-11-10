import styled from 'styled-components';

// Container principal do searchbar
export const SearchWrapper = styled.div`
    display: flex;
    align-items: center;
    
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