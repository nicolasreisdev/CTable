import React from 'react';
import { FormPageContainer, FormWrapper, FormTitle, StyledForm, StyledInput, SubmitButton, RedirectLink } from '../../components/domain/Form/styles';


const handleDateFocus = (e: React.FocusEvent<HTMLInputElement>) => {
  e.target.type = 'date';
};

const handleDateBlur = (e: React.FocusEvent<HTMLInputElement>) => {
  if (!e.target.value) {
    e.target.type = 'text';
  }
};


export default function Register() {
  return (
    <FormPageContainer>
      <FormWrapper>
        <FormTitle>Criar conta</FormTitle>
        
        <StyledForm>
          <StyledInput 
            type="text" 
            placeholder="Nome completo" 
            required 
          />
          <StyledInput 
            type="text" 
            placeholder="Nome de usuário (user)" 
            required 
          />
          <StyledInput 
            type="email" 
            placeholder="Email" 
            required 
          />
          <StyledInput 
            type="password" 
            placeholder="Senha" 
            required 
          />
          <StyledInput 
            type="tel" 
            placeholder="Telefone" 
            required 
          />
          <StyledInput
            type="text" // Começa como texto para mostrar o placeholder
            placeholder="Data de nascimento"
            onFocus={handleDateFocus}
            onBlur={handleDateBlur}
            required
          />
          
          <SubmitButton type="submit">Cadastrar</SubmitButton>
        </StyledForm>

        <RedirectLink>
          Já tem uma conta? <a href="/login">Faça login</a>
        </RedirectLink>
      </FormWrapper>
    </FormPageContainer>
  );
}

