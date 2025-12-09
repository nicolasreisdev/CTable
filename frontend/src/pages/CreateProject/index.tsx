import { useState, useEffect } from 'react';
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
import { parseDate } from '../../API/Project';

interface ProjectFormProps extends Omit<ProjectProps, 'startDate'> {
  startDate: string; 
}

export default function CreateProject() {
  const navigate = useNavigate();
  const location = useLocation(); // Hook para ler o state
  const [keywords, setKeywords] = useState<string[]>([]); 

  const { projectId: paramId } = useParams<{ projectId?: string }>(); 

  // Recupera o projeto do estado
  const projectToEdit = location.state?.projectToEdit as (ProjectProps & { id?: string; projectID?: string }) | undefined;
  // Define se é modo edição
  const isEditMode = !!projectToEdit;

  const validProjectId = projectToEdit?.id 
                      || projectToEdit?.projectID 
                      || (paramId !== 'undefined' ? paramId : undefined);

  const formatDateToString = (date?: Date | string) => {
    if (!date) return "";
    const d = new Date(date);
    // Verifica se é data válida
    if (isNaN(d.getTime())) return "";
    return d.toLocaleDateString('pt-BR'); 
  };

  const { register, handleSubmit, control, watch } = useForm<ProjectFormProps>({
    // Preenche os valores padrão se estiver em modo de edição
    defaultValues: {
      title: projectToEdit?.title || "",
      description: projectToEdit?.description || "",
      technologies: projectToEdit?.technologies || [], 
      status: projectToEdit?.status || "",
      startDate: formatDateToString(projectToEdit?.startDate)
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
  const onSubmit = (data: ProjectFormProps) => {

    const finalData: ProjectProps = {
        ...data,
        startDate: parseDate(data.startDate) 
    };

    try {
      if (isEditMode && validProjectId) {
        // MODO DE EDIÇÃO
        console.log("Atualizando Projeto:", validProjectId, finalData);
        UpdateProject(validProjectId, finalData); 
        setNotification({ message: 'Projeto atualizado com sucesso!', type: 'success' });
      } else {
        // MODO DE CRIAÇÃO
        console.log("Criando Projeto:", finalData);
        NewProject(finalData); 
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
            <S.Label htmlFor="title">Nome do Projeto</S.Label>
            <S.Input id="title" {...register('title', { required: true })} />
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
            <S.Label htmlFor="startDate">Data de Início</S.Label>
            <Controller
              name="startDate"
              control={control}
              render={({ field: { onChange, value } }) => (
                <S.Input
                  as={IMaskInput}
                  mask="00/00/0000"
                  id="startDate"
                  placeholder="DD/MM/AAAA"
                  value={value} 
                  onAccept={(value: string) => onChange(value)}
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

          <S.SubmitButton type="submit">
            {isEditMode ? 'Atualizar Projeto' : 'Criar Projeto'}
          </S.SubmitButton>

        </S.FormContainer>
      </ContentWrapper>
    </PageWrapper>
  );
}