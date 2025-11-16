import React from 'react';
import { useForm } from 'react-hook-form';
import Sidebar from '../../components/layout/Sidebar';
// Assumindo que seus estilos de layout estão em 'layout/styles.ts'
import { PageWrapper, ContentWrapper } from '../Feed/styles'; 
// Importa estilos do formulário de criação
import * as S from '../../components/domain/CreationForm/styles'; 

export default function CreateProject() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    console.log("Criando Projeto:", data);
    // TODO: Lógica da API aqui
  };

  return (
    <PageWrapper>
      <Sidebar />

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
            <S.Input id="description" {...register('description')} />
          </S.InputGroup>
          
          <S.InputGroup>
            <S.Label htmlFor="technologies">Tecnologias</S.Label>
            <S.Input id="technologies" {...register('technologies')} />
          </S.InputGroup>

          <S.InputGroup>
            <S.Label htmlFor="status">Status</S.Label>
            <S.Input id="status" {...register('status')} />
          </S.InputGroup>

          <S.SubmitButton type="submit">Criar Projeto</S.SubmitButton>

        </S.FormContainer>
      </ContentWrapper>
    </PageWrapper>
  );
}