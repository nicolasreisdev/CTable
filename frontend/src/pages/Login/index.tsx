import React, {useState} from 'react';
import {
  FormPageContainer,
  FormWrapper,
  FormTitle,
  StyledForm,
  StyledInput,
  SubmitButton,
  RedirectLink
} from '../../components/domain/Form/styles';
import { useForm} from 'react-hook-form';
import  Toast  from '../../components/common/Toast';
import { useNavigate } from 'react-router-dom';
import {Login} from '../../API/Auth'
import type { LoginProps } from '../../API/Auth';
import { useAuth } from '../../API/AuthContext';
import type { NotificationState } from '../../components/common/Toast';

export default function LoginPage() {
  const [notification, setNotification] = useState<NotificationState | null>(null);
  const { login } = useAuth();
    
  const { register, handleSubmit, formState: {isSubmitting} } = useForm<LoginProps>();
  const navigate = useNavigate();
  
    async function onSubmit(data: LoginProps) {
      console.log(data);
      try{
        //await Login(data);
        await login(data);
        
        console.log('Usuário registrado com sucesso');
        
        // Define estado para mostrar notificação de sucesso
        setNotification({ message: 'Usuário registrado com sucesso!', type: 'success' });
    
        setTimeout(() => {
        navigate('/feed'); // Navega para a página de feed
        }, 1000);
        
      } catch (error) { 
        console.error('Erro ao registrar usuário:', error);
        
        // Define estado para mostrar notificação de erro
        if (error instanceof Error){
        setNotification({ message: error.message, type: 'error' });
        }
      } 
  }

  return (
    <FormPageContainer>
      {notification && (
        <Toast
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)} 
        />
      )}
      <FormWrapper>
        <FormTitle>Login</FormTitle>
        
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <StyledInput 
            type="text" 
            placeholder="Email ou usuário" 
            required 
            {...register('username')}
          />
          <StyledInput 
            type="password" 
            placeholder="Senha" 
            required 
            {...register('senha')}
          />
          
          <SubmitButton disabled = {isSubmitting} type="submit">Entrar</SubmitButton>
        </StyledForm>

        <RedirectLink>
          Não tem uma conta? <a href="/register">Cadastre-se</a>
        </RedirectLink>
      </FormWrapper>
    </FormPageContainer>
  );
}

