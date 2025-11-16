import styled from 'styled-components';

// O <form> container
export const FormContainer = styled.form`
  /* O fundo do formulário (o card cinza) */
  background: ${props => props.theme['gray-300']}; /* Cor cinza clara */
  border-radius: 16px;
  padding: 32px;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

// Wrapper para cada par de (label + input)
export const InputGroup = styled.div`
  margin-bottom: 24px;
  width: 100%;
`;

// Label 
export const Label = styled.label`
  display: block;
  font-size: 1.1em;
  font-weight: 600;
  color: ${props => props.theme.title}; 
  margin-bottom: 10px;
`;

// Input 
export const Input = styled.input`
  width: 100%;
  padding: 16px 20px;
  font-size: 1em;
  
  background-color: #FFFFFF; 
  border: 1px solid ${props => props.theme.placeholder};
  border-radius: 9999px; 
  color: ${props => props.theme.title};
  box-sizing: border-box; 
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &::placeholder {
    color: ${props => props.theme.placeholder};
  }
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.keyword};
    box-shadow: 0 0 0 3px ${props => props.theme.keyword}33;
  }
`;

export const SelectWrapper = styled.div`
  position: relative;
  width: 100%;

  /* A seta de seleção (CSS) */
  &::after {
    content: '▾'; /* Caractere de seta */
    font-size: 1.5em;
    color: ${props => props.theme.placeholder};
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none; /* Permite o clique "através" da seta */
  }
`;

// Componente de Select 
export const Select = styled.select`
  width: 100%;
  padding: 16px 20px;
  font-size: 1em;
  
  background-color: #FFFFFF; 
  border: 1px solid ${props => props.theme.placeholder};
  border-radius: 9999px; 
  color: ${props => props.theme.title};
  box-sizing: border-box; 
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;

  padding-right: 50px;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.keyword};
    box-shadow: 0 0 0 3px ${props => props.theme.keyword}33;
  }

  &:invalid {
    color: ${props => props.theme.placeholder};
  }
`;

// Wrapper para o input de busca E a lista de resultados 
export const SearchWrapper = styled.div`
  position: relative;
  width: 100%;
`;

// Lista de resultados de busca que aparece abaixo do input 
export const SearchResultsList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: #fff;
  border: 1px solid ${props => props.theme.placeholder};
  border-radius: 8px; 
  max-height: 200px;
  overflow-y: auto;
  margin-top: 4px;
  padding: 4px;
  z-index: 10;
  list-style: none;
`;

// Item individual na lista de resultados 
export const SearchResultItem = styled.li`
  padding: 10px 14px;
  cursor: pointer;
  border-radius: 4px;
  color: ${props => props.theme.title};
  font-weight: 500;

  &:hover {
    background-color: ${props => props.theme['gray-100']};
  }
`;

// Mensagem de erro 
export const ErrorMessage = styled.span`
  font-size: 0.9em;
  margin-top: 8px;
`;

// Botão de submissão
export const SubmitButton = styled.button`
  padding: 15px 30px;
  font-size: 1.1em;
  font-weight: 600;
  color: ${props => props.theme.white};
  background-color: ${props => props.theme.button};
  border: none;
  border-radius: 9999px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 10px;

  &:hover {
    background-color: ${props => props.theme['hover-button']};
  }
`;