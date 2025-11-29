import React, {useState, useEffect} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import Sidebar from '../../components/layout/Sidebar';
import { PageWrapper, ContentWrapper } from '../Feed/styles'; 
import * as S from '../../components/domain/CreationForm/styles'; 
import TagInput from '../../components/domain/TagInput';
import type { NotificationState } from '../../components/common/Toast';
import { GetKeywords } from '../../API/Keywords';
import  Toast  from '../../components/common/Toast';
import type { CommunityProps } from '../../API/Community';
import { NewCommunity, UpdateCommunity } from '../../API/Community';

export default function CreateCommunity() {
  const navigate = useNavigate();
  const location = useLocation();

  const communityToEdit = location.state?.communityToEdit as CommunityProps | undefined;
  const isEditMode = !!communityToEdit;
  
  const { register, handleSubmit, control, watch } = useForm<CommunityProps>({
    // Preenche os valores iniciais com os dados da comunidade se estiver editando
    defaultValues: {
      communityID: communityToEdit?.communityID || "",
      name: communityToEdit?.name || "",
      description: communityToEdit?.description || "",
      technologies: communityToEdit?.technologies || []
    }
  });

  const descriptionValue = watch('description');
  const descriptionLength = descriptionValue ? descriptionValue.length : 0;
  const MAX_CHARS = 500;
  const [notification, setNotification] = useState<NotificationState | null>(null);
  const [keywords, setKeywords] = useState<string[]>([]); 

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

  const onSubmit = (data: CommunityProps) => {
    try{
      if (isEditMode && communityToEdit) {
        // --- MODO EDIÇÃO ---
        console.log("Atualizando Comunidade:", communityToEdit.communityID, data);
        UpdateCommunity(communityToEdit.communityID, data);
        setNotification({ message: 'Comunidade atualizada com sucesso!', type: 'success' });
      } else {
        // --- MODO CRIAÇÃO ---
        console.log("Criando Comunidade:", data);
        NewCommunity(data);
        setNotification({ message: 'Comunidade criada com sucesso!', type: 'success' });
      }

      setTimeout(() => {
          navigate('/feed'); 
      }, 1000);

    } catch (error) {
      console.error('Erro ao criar comunidade:', error);
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

          <h2>{isEditMode ? 'Editar Comunidade' : 'Criar Comunidade'}</h2>
          
          <S.InputGroup>
            <S.Label htmlFor="name">Nome da Comunidade</S.Label>
            <S.Input id="name" {...register('name', { required: true })} />
          </S.InputGroup>

          <S.InputGroup>
            <S.Label htmlFor="description">Descrição do Projeto</S.Label>
              <S.TextArea 
                id="description"
                placeholder="Descreva sua comunidade..."
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
            <S.Label htmlFor="keywords">Palavras-chave</S.Label>
            
            <Controller
              name="technologies"
              control={control}
              render={({ field }) => (
                <TagInput 
                  value={field.value}
                  onChange={field.onChange}
                  searchList={keywords}
                  limit={10} 
                  placeholder="Adicione até 10 palavras-chave..."
                />
              )}
            />
          </S.InputGroup>

          <S.SubmitButton type="submit">{isEditMode ? 'Salvar Alterações' : 'Criar Comunidade'}</S.SubmitButton>

        </S.FormContainer>
      </ContentWrapper>
    </PageWrapper>
  );
}