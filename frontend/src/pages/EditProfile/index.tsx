
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/layout/Sidebar';
import { PageWrapper, ContentWrapper } from '../Feed/styles';

import * as S from '../../components/domain/CreationForm/styles'; 
import Toast from '../../components/common/Toast';
import type { NotificationState } from '../../components/common/Toast';
import { useAuth } from '../../API/AuthContext';
import { UpdateProfile } from '../../API/User';
import type { UserProfileData } from '../../API/User';

export default function EditProfile() {
  const { currentUser, updateUser } = useAuth(); 
  const navigate = useNavigate();
  const [notification, setNotification] = useState<NotificationState | null>(null);

  // Formata a data para o input (YYYY-MM-DD) 
  const formatDateForInput = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  const { register, handleSubmit, setValue } = useForm<UserProfileData>();

  // Preenche o formulário com os dados atuais
  useEffect(() => {
    if (currentUser) {
      setValue('nomeCompleto', currentUser.nomeCompleto || '');
      setValue('username', currentUser.username || '');
      setValue('email', currentUser.email || '');
      setValue('telefone', (currentUser as any).phone || ''); 
      setValue('dataNascimento', formatDateForInput((currentUser as any).birthDate)); 
    }
  }, [currentUser, setValue]);

  const onSubmit = async (data: UserProfileData) => {
    try {
      console.log("Atualizando perfil:", data);
      await UpdateProfile(data);
      
      setNotification({ message: 'Perfil atualizado com sucesso!', type: 'success' });
      
      updateUser(data);

      // Redireciona
      setTimeout(() => {
          navigate('/profile');
      }, 1000);

    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        setNotification({ message: error.message, type: 'error' });
      }
    }
  };

  return (
    <PageWrapper>
      <Sidebar />
      {notification && (
        <Toast 
            message={notification.message} 
            type={notification.type} 
            onClose={() => setNotification(null)} 
        />
      )}

      <ContentWrapper>
        <S.FormContainer onSubmit={handleSubmit(onSubmit)}>
          <h2>Editar Perfil</h2>

          <S.InputGroup>
            <S.Label htmlFor="nomeCompleto">Nome Completo</S.Label>
            <S.Input 
                id="nomeCompleto" 
                {...register('nomeCompleto', { required: true })} 
            />
          </S.InputGroup>

          <S.InputGroup>
            <S.Label htmlFor="username">Nome de Usuário</S.Label>
            <S.Input 
                id="username" 
                {...register('username', { required: true })} 
            />
          </S.InputGroup>

          <S.InputGroup>
            <S.Label htmlFor="email">Email</S.Label>
            <S.Input 
                id="email" 
                type="email"
                {...register('email', { required: true })} 
            />
          </S.InputGroup>

          <S.InputGroup>
            <S.Label htmlFor="telefone">Telefone</S.Label>
            <S.Input 
                id="telefone" 
                {...register('telefone')} 
            />
          </S.InputGroup>

          <S.InputGroup>
            <S.Label htmlFor="dataNascimento">Data de Nascimento</S.Label>
            <S.Input 
                id="dataNascimento" 
                type="date"
                {...register('dataNascimento')} 
            />
          </S.InputGroup>

          <S.SubmitButton type="submit">
            Salvar Alterações
          </S.SubmitButton>

        </S.FormContainer>
      </ContentWrapper>
    </PageWrapper>
  );
}