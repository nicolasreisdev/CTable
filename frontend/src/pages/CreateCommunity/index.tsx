import React from 'react';
import { useForm } from 'react-hook-form';
import Sidebar from '../../components/layout/Sidebar';
// Assumindo que seus estilos de layout estão em 'layout/styles.ts'
import { PageWrapper, ContentWrapper } from '../Feed/styles'; 
// Reutiliza os mesmos estilos de formulário
import * as S from '../../components/domain/CreationForm/styles'; 

export default function CreateCommunity() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    console.log("Criando Comunidade:", data);
    // TODO: Lógica da API aqui
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
            <S.Input id="keywords" {...register('keywords')} />
          </S.InputGroup>

          <S.SubmitButton type="submit">Criar Comunidade</S.SubmitButton>

        </S.FormContainer>
      </ContentWrapper>
    </PageWrapper>
  );
}