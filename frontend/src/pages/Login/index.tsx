import React from 'react';
import {
  FormPageContainer,
  FormWrapper,
  FormTitle,
  StyledForm,
  StyledInput,
  SubmitButton,
  RedirectLink
} from '../../components/domain/Form/styles';

export default function LoginPage() {
  return (
    <FormPageContainer>
      <FormWrapper>
        <FormTitle>Login</FormTitle>
        
        <StyledForm>
          <StyledInput 
            type="email" 
            placeholder="Email ou usuário" 
            required 
          />
          <StyledInput 
            type="password" 
            placeholder="Senha" 
            required 
          />
          
          <SubmitButton type="submit">Entrar</SubmitButton>
        </StyledForm>

        <RedirectLink>
          Não tem uma conta? <a href="/register">Cadastre-se</a>
        </RedirectLink>
      </FormWrapper>
    </FormPageContainer>
  );
}

