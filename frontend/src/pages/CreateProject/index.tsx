import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Sidebar from '../../components/layout/Sidebar';
import { PageWrapper, ContentWrapper } from '../Feed/styles'; 
import * as S from '../../components/domain/CreationForm/styles'; 
import TagInput from '../../components/domain/TagInput';
import { IMaskInput } from 'react-imask';
import { NewProject, UpdateProject } from '../../API/Project'; 
import type { ProjectProps } from '../../API/Project';
import  Toast  from '../../components/common/Toast';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import type { NotificationState } from '../../components/common/Toast';
import { GetKeywords } from '../../API/Keywords';

export default function CreateProject() {
  const navigate = useNavigate();
  const location = useLocation(); // Hook para ler o state
  const { projectId } = useParams<{ projectId?: string }>(); // Hook para ler o ID da URL
  const [keywords, setKeywords] = useState<string[]>([]); 

  // Verifica se estamos em modo de EDIÇÃO
  // Tenta pegar o projeto enviado pelo 'state' da navegação
  const projectToEdit = location.state?.projectToEdit as (ProjectProps & { id: string }) | undefined;
  const isEditMode = !!projectToEdit; // Se projectToEdit existe, estamos editando

  const { register, handleSubmit, control, watch } = useForm<ProjectProps>({
    // Preenche os valores padrão se estiver em modo de edição
    defaultValues: {
      name: projectToEdit?.name || "",
      description: projectToEdit?.description || "",
      technologies: projectToEdit?.technologies || [], 
      status: projectToEdit?.status || "",
      date: projectToEdit?.date || ""
    }
  });

  const descriptionValue = watch('description');
  const descriptionLength = descriptionValue ? descriptionValue.length : 0;
  const MAX_CHARS = 2500;
  const [notification, setNotification] = useState<NotificationState | null>(null);

  // Carrega as tecnologias disponíveis do backend
  useEffect(() => {
    async function loadTechs() {
      try {
        const techsFromDB = await GetKeywords();
        setKeywords(techsFromDB);
      } catch (error) {
        console.error("Falha ao carregar tecnologias:", error);
      }
    }
    loadTechs();
  }, []);

  // Lida com CRIAR ou ATUALIZAR
  const onSubmit = (data: ProjectProps) => {
    try {
      if (isEditMode) {
        // MODO DE EDIÇÃO
        console.log("Atualizando Projeto:", projectId, data);
        // UpdateProject(projectId, data); 
        setNotification({ message: 'Projeto atualizado com sucesso!', type: 'success' });
      } else {
        // MODO DE CRIAÇÃO
        console.log("Criando Projeto:", data);
        NewProject(data); 
        setNotification({ message: 'Projeto criado com sucesso!', type: 'success' });
      }
      
      // Redireciona após o sucesso
      setTimeout(() => {
          navigate('/feed'); 
      }, 1000);

    } catch(error) {
      console.error('Erro ao salvar projeto:', error);
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
          
          <h2>{isEditMode ? 'Editar Projeto' : 'Criar Projeto'}</h2>

          <S.InputGroup>
            <S.Label htmlFor="name">Nome do Projeto</S.Label>
            <S.Input id="name" {...register('name', { required: true })} />
          </S.InputGroup>

          <S.InputGroup>
            <S.Label htmlFor="description">Descrição do Projeto</S.Label>
            <S.TextArea 
              id="description"
              placeholder="Descreva seu projeto..."
              maxLength={MAX_CHARS}
              {...register('description', {
                maxLength: {
                  value: MAX_CHARS,
                  message: `A descrição não pode exceder ${MAX_CHARS} caracteres`
                }
              })}
            />
            <S.CharacterCount>
              {descriptionLength} / {MAX_CHARS}
            </S.CharacterCount>
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
                  // 9. Desabilita a data se estiver em modo de edição
                  disabled={isEditMode} 
                />
              )}
            />
          </S.InputGroup>
          
          <S.InputGroup>
            <S.Label htmlFor="technologies">Tecnologias (Palavras-chave)</S.Label>
            <Controller
              name="technologies"
              control={control}
              render={({ field }) => (
                <TagInput 
                  value={field.value}
                  onChange={field.onChange}
                  searchList={keywords}
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

          {/* 10. Botão de submit dinâmico */}
          <S.SubmitButton type="submit">
            {isEditMode ? 'Atualizar Projeto' : 'Criar Projeto'}
          </S.SubmitButton>

        </S.FormContainer>
      </ContentWrapper>
    </PageWrapper>
  );
}