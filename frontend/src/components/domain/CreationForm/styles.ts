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