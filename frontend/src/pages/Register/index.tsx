import { useState } from 'react';
import { FormPageContainer, FormWrapper, FormTitle, StyledForm, StyledInput, SubmitButton, RedirectLink } from '../../components/domain/Form/styles';
import { useForm, Controller} from 'react-hook-form';
import { IMaskInput } from 'react-imask';
import  Toast  from '../../components/common/Toast';
import { useNavigate } from 'react-router-dom';
import {Register as RegisterAPI} from '../../API/Auth'
import type { RegisterProps } from '../../API/Auth';
import type { NotificationState } from '../../components/common/Toast';

export default function Register() {
  // Estado para a notificação - usado no Toast
  const [notification, setNotification] = useState<NotificationState | null>(null);

  
  const { register, handleSubmit, formState: {isSubmitting}, control } = useForm<RegisterProps>();
  const navigate = useNavigate();

  async function onSubmit(data: RegisterProps) {
    console.log(data);
    try{
      await RegisterAPI(data);
      
      console.log('Usuário registrado com sucesso:');
      
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
        <FormTitle>Criar conta</FormTitle>
        
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <StyledInput 
            type="text" 
            placeholder="Nome completo" 
            required 
            {...register('nomeCompleto')}
          />
          <StyledInput 
            type="text" 
            placeholder="Nome de usuário (user)" 
            required 
            {...register('username')}
          />
          <StyledInput 
            type="email" 
            placeholder="Email" 
            required 
            {...register('email')}
          />
          <StyledInput 
            type="password" 
            placeholder="Senha" 
            required 
            {...register('senha')}
          />
          <StyledInput 
            type="tel" 
            placeholder="Telefone" 
            required 
            {...register('telefone')}
          />
          <Controller
            name="dataNascimento"
            control={control}
            rules={{ required: true }} 
            render={({ field }) => (
              <StyledInput
                {...field}
                as={IMaskInput} 
                mask="00/00/0000"
                placeholder="Data de nascimento"
                required
              />
            )}
          />
          
          <SubmitButton disabled = {isSubmitting} type="submit">Cadastrar</SubmitButton>
        </StyledForm>

        <RedirectLink>
          Já tem uma conta? <a href="/login">Faça login</a>
        </RedirectLink>
      </FormWrapper>
    </FormPageContainer>
  );
}

