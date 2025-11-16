import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Sidebar from '../../components/layout/Sidebar';
import { PageWrapper, ContentWrapper } from '../Feed/styles'; 
import * as S from '../../components/domain/CreationForm/styles'; 
import TagInput from '../../components/domain/TagInput';
import { IMaskInput } from 'react-imask';
import { NewProject } from '../../API/Project';
import type { ProjectProps } from '../../API/Project';
import  Toast  from '../../components/common/Toast';
import { useNavigate } from 'react-router-dom';

interface NotificationState {
  message: string;
  type: 'success' | 'error';
}

const MOCK_TECHS_DB = [
  'React', 'Node.js', 'TypeScript', 'JavaScript', 'Python', 'Django',
  'Next.js', 'Vue.js', 'Angular', 'Java', 'Spring Boot', 'C#', '.NET'
  // ... (mais tecnologias)
];

export default function CreateProject() {
  const { register, handleSubmit, control } = useForm<ProjectProps>({
    defaultValues: {
      name: "",
      description: "",
      technologies: [], 
      status: "",
      date: ""
    }
  });

  const [notification, setNotification] = useState<NotificationState | null>(null);
  const navigate = useNavigate();

  const onSubmit = (data: ProjectProps) => {
    console.log("Criando Projeto:", data);
    try{
        NewProject(data);

        setNotification({ message: 'Projeto criado com sucesso!', type: 'success' });
        setTimeout(() => {
            navigate('/feed'); 
        }, 1000);
    }
    catch(error){
      console.error('Erro ao criar projeto:', error);

      if (error instanceof Error){
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
          
          <S.InputGroup>
            <S.Label htmlFor="name">Nome do Projeto</S.Label>
            <S.Input id="name" {...register('name', { required: true })} />
          </S.InputGroup>

          <S.InputGroup>
            <S.Label htmlFor="description">Descrição do Projeto</S.Label>
            <S.Input id="description" {...register('description')} />
          </S.InputGroup>

          <S.InputGroup>
            <S.Label htmlFor="date">Data de Início</S.Label>
            <Controller
              name="date"
              control={control}
              render={({ field }) => (
                <S.Input
                  as={IMaskInput}
                  mask="00/00/0000"
                  id="date"
                  placeholder="DD/MM/AAAA"
                  {...field}
                />
              )}
            />
          </S.InputGroup>
          
          <S.InputGroup>
            <S.Label htmlFor="technologies">Tecnologias</S.Label>
            
            <Controller
              name="technologies"
              control={control}
              render={({ field }) => (
                <TagInput 
                  value={field.value}
                  onChange={field.onChange}
                  searchList={MOCK_TECHS_DB}
                  limit={6}
                  placeholder="Adicione até 6 tecnologias..."
                />
              )}
            />
          </S.InputGroup>

          <S.InputGroup>
            <S.Label htmlFor="status">Status</S.Label>
            <S.SelectWrapper>
              <S.Select 
                id="status" 
                {...register('status', { required: true })}
                required 
              >
                <option value="" disabled>Selecione um status...</option>
                <option value="em-andamento">Em andamento</option>
                <option value="pausado">Pausado</option>
                <option value="finalizado">Finalizado</option>
              </S.Select>
            </S.SelectWrapper>
          </S.InputGroup>

          <S.SubmitButton type="submit">Criar Projeto</S.SubmitButton>

        </S.FormContainer>
      </ContentWrapper>
    </PageWrapper>
  );
}