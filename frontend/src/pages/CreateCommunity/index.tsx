import React, {useState} from 'react';
import { useForm, Controller } from 'react-hook-form';
import Sidebar from '../../components/layout/Sidebar';
import { PageWrapper, ContentWrapper } from '../Feed/styles'; 
import * as S from '../../components/domain/CreationForm/styles'; 
import TagInput from '../../components/domain/TagInput';
import { IMaskInput } from 'react-imask';
import type { NotificationState } from '../../components/common/Toast';

const MOCK_KEYWORDS_DB = [
  'Frontend', 'Backend', 'Web', 'Mobile', 'Design', 'Data Science', 
  'Inteligência Artificial', 'Blockchain', 'DevOps', 'Carreira', 'Games'
  // ... (mais palavras-chave)
];

interface CommunityFormData {
  name: string;
  description: string;
  keywords: string[]; 
}

export default function CreateCommunityPage() {
  
  const { register, handleSubmit, control, watch } = useForm<CommunityFormData>({
    defaultValues: {
      name: "",
      description: "",
      keywords: [] 
    }
  });

  const descriptionValue = watch('description');
  const descriptionLength = descriptionValue ? descriptionValue.length : 0;
  const MAX_CHARS = 500;
  const [notification, setNotification] = useState<NotificationState | null>(null);

  const onSubmit = (data: CommunityFormData) => {
    try{
      // Lógica para criar a comunidade via API
      setNotification({ message: 'Comunidade criada com sucesso!', type: 'success' });
      console.log("Criando Comunidade:", data);
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

      <ContentWrapper>
        <S.FormContainer onSubmit={handleSubmit(onSubmit)}>
          
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
              name="keywords"
              control={control}
              render={({ field }) => (
                <TagInput 
                  value={field.value}
                  onChange={field.onChange}
                  searchList={MOCK_KEYWORDS_DB}
                  limit={10} 
                  placeholder="Adicione até 10 palavras-chave..."
                />
              )}
            />
          </S.InputGroup>

          <S.SubmitButton type="submit">Criar Comunidade</S.SubmitButton>

        </S.FormContainer>
      </ContentWrapper>
    </PageWrapper>
  );
}