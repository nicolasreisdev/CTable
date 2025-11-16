import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import Sidebar from '../../components/layout/Sidebar';
import { PageWrapper, ContentWrapper } from '../Feed/styles'; 
import * as S from '../../components/domain/CreationForm/styles'; 
import TagInput from '../../components/domain/TagInput';

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
  
  const { register, handleSubmit, control } = useForm<CommunityFormData>({
    defaultValues: {
      name: "",
      description: "",
      keywords: [] 
    }
  });

  const onSubmit = (data: CommunityFormData) => {
    console.log("Criando Comunidade:", data);
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
            <S.Label htmlFor="description">Descrição da Comunidade</S.Label>
            <S.Input id="description" {...register('description')} />
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