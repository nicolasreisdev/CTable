import styled from 'styled-components';

// Container principal da página de autenticação
export const FormPageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  background-color: ${props => props.theme['home-background']}; 
  font-family: 'Montserrat', sans-serif;
  box-sizing: border-box;
`;

// Card do formulário de autenticação
export const FormWrapper = styled.div`
  max-width: 480px;
  width: 100%;
  padding: 40px;
  background-color: ${props => props.theme.card}; 
  border-radius: 16px;
  border: 1px solid ${props => props.theme.placeholder}55; 
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
`;

// Título 
export const FormTitle = styled.h2`
  color: ${props => props.theme.subtitle}; 
  font-size: 2.2em;
  font-weight: 700;
  text-align: center;
  margin-top: 0;
  margin-bottom: 35px;
`;

// Elemento <form>
export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px; /* Espaçamento entre os inputs */
`;

// Inputs
export const StyledInput = styled.input`
  width: 100%;
  padding: 14px 18px;
  font-size: 1em;
  background-color: transparent; 
  border: 1px solid ${props => props.theme.white}; 
  border-radius: 8px;
  color: ${props => props.theme.white}; 
  box-sizing: border-box; 
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &::placeholder {
    color: ${props => props.theme.white};
    opacity: 1; 
  }
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.keyword};
    box-shadow: 0 0 0 3px ${props => props.theme.keyword}33; 
  }

  &::-webkit-calendar-picker-indicator {
    display: none;
    -webkit-appearance: none;
  }
`;

// Botão de "Submit"
export const SubmitButton = styled.button`
  padding: 15px 20px;
  font-size: 1.1em;
  font-weight: 600;
  color: ${props => props.theme.white};
  background-color: ${props => props.theme.button};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 10px;

  &:hover {
    background-color: ${props => props.theme['hover-button']};
  }
`;

// Texto de redirecionamento
export const RedirectLink = styled.p`
  text-align: center;
  margin-top: 25px;
  font-size: 0.9em;
  color: ${props => props.theme.placeholder}; 

  a {
    color: ${props => props.theme.keyword}; 
    font-weight: 600;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;