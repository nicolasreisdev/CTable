import React, { useState } from 'react';
import { FormPageContainer, FormWrapper, FormTitle, StyledForm, StyledInput, SubmitButton, RedirectLink } from '../../components/domain/Form/styles';
import { useForm, Controller} from 'react-hook-form';
import { IMaskInput } from 'react-imask';
import  Toast  from '../../components/common/Toast';

interface NotificationState {
  message: string;
  type: 'success' | 'error';
}

interface RegisterProps {
  name: string;
  username: string;
  email: string;
  password: string;
  phone: string;
  birthdate: string; 
}

export default function Register() {
  // Estado para a notificação - usado no Toast
  const [notification, setNotification] = useState<NotificationState | null>(null);

  
  const { register, handleSubmit, formState: {isSubmitting}, control } = useForm<RegisterProps>();

  async function onSubmit(data: RegisterProps) {
    console.log(data);
    try{
      /* ... Lógica da API ... */
      
      console.log('Usuário registrado com sucesso:');
      
      // Define estado para mostrar notificação de sucesso
      setNotification({ message: 'Usuário registrado com sucesso!', type: 'success' });
      
    } catch (error) { 
      console.error('Erro ao registrar usuário:', error);
      
      // Define estado para mostrar notificação de erro
      setNotification({ message: 'Erro ao registrar usuário.', type: 'error' });
    }
  }

  return (
    <FormPageContainer>
      
      {notification && (
        <Toast
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)} // Função para fechar
        />
      )}

      <FormWrapper>
        <FormTitle>Criar conta</FormTitle>
        
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <StyledInput 
            type="text" 
            placeholder="Nome completo" 
            required 
            {...register('name')}
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
            {...register('password')}
          />
          <StyledInput 
            type="tel" 
            placeholder="Telefone" 
            required 
            {...register('phone')}
          />
          <Controller
            name="birthdate"
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

