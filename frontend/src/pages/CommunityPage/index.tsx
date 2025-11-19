import React from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../../components/layout/Sidebar';
import Postcard from '../../components/domain/Postcard';
import * as S from './styles';
import { FiMoreHorizontal } from 'react-icons/fi'; // Biblioteca de ícones comum 

// Dados fictícios para preencher a tela
const MOCK_COMMUNITY = {
  name: 'r/React',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eget ligula eu lectus lobortis condimentum. Aliquam nonummy auctor massa.',
  keywords: ['Frontend', 'Web', 'Framework', 'JavaScript'],
  memberCount: 'ceci', 
};

const MOCK_POSTS = [
  {
    id: '1',
    name: 'r/React', // Nome do projeto/post
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eget ligula eu lectus lobortis condimentum.',
    technologies: ['React', 'TS'],
    status: 'em-andamento',
    date: '19/11/2025',
    avatarUrl: '', // Url vazia usa placeholder
    author: { id: '1', username: 'ceci', name: 'ceci' },
    community: { name: 'r/React' }
  },
  {
    id: '2',
    name: 'r/React',
    description: 'Outro post de exemplo com texto simulado para compor o feed da comunidade.',
    technologies: ['React'],
    status: 'finalizado',
    date: '18/11/2025',
    avatarUrl: '',
    author: { id: '1', username: 'ceci', name: 'ceci' },
    community: { name: 'r/React' }
  }
];

export default function CommunityPage() {
  const { communityName } = useParams<{ communityName: string }>();

  return (
    <S.PageWrapper>
      <Sidebar />

      <S.MainContent>
        <S.Banner />
        
        <S.HeaderContainer>
          <S.Avatar /> 
          
          <S.HeaderInfo> {/* TODO puxar dados da tabela da comunidade */}
            <h1>{MOCK_COMMUNITY.name}</h1>
            <span>{MOCK_COMMUNITY.memberCount}</span>
          </S.HeaderInfo>

          <S.HeaderActions>
            <S.JoinButton>Join</S.JoinButton> {/* TODO: lógica de API e não mostrar o botão a quem já for membro */}
            <S.OptionsButton>
                <FiMoreHorizontal /> {/* Aplicar menu dropdown com opções (considerar que algumas opções só existem pro admin) */}
            </S.OptionsButton>
          </S.HeaderActions>
        </S.HeaderContainer>

        <S.ContentGrid>
          
          <S.FeedColumn>
            {MOCK_POSTS.map(post => (
              <S.FeedCardWrapper key={post.id}>
                <Postcard 
                  post={post} 
                  showMenu={false} 
                />
              </S.FeedCardWrapper>
            ))}
          </S.FeedColumn>

          <S.InfoSidebar>
            <h3>DESCRIPTION</h3>
            <p>{MOCK_COMMUNITY.description}</p>
            <p>Nulla at risus. Quisque purus magna, auctor et, sagittis ac, posuere eu, lectus.</p>

            <h3>KEYWORDS</h3> {/* TODO puxar palavras da tabela da comunidade */}
            <S.KeywordsContainer>
              {MOCK_COMMUNITY.keywords.map(keyword => (
                <S.KeywordTag key={keyword}>
                  {keyword}
                </S.KeywordTag>
              ))}
            </S.KeywordsContainer>
          </S.InfoSidebar>

        </S.ContentGrid>
      </S.MainContent>
    </S.PageWrapper>
  );
}