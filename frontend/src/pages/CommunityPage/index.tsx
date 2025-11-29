import React from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../../components/layout/Sidebar';
import Postcard from '../../components/domain/Postcard';
import * as S from './styles';
import { FiMoreHorizontal } from 'react-icons/fi'; 
import { useEffect, useState } from 'react';
import { GetCommunityById, JoinCommunity } from '../../API/Community';
import type { NotificationState } from '../../components/common/Toast';
import Toast from '../../components/common/Toast';
import type { CommunityProps } from '../../API/Community';

export default function CommunityPage() {
  const { communityID } = useParams<{ communityID: string }>();
  const [notification, setNotification] = useState<NotificationState | null>(null);
  const [community, setCommunity] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    async function loadData() {
        console.log("Carregando dados da comunidade para ID:", communityID);
        if (!communityID) return;
        try {
            const data = await GetCommunityById(communityID);
            setCommunity(data.community);
            setPosts(data.posts);
        } catch (error) {
            console.error(error);
        } 
    }
    loadData();
  }, [communityID]);

  const handleJoin = async () => {
    if (!community) return;

    try {
        await JoinCommunity(community.communityID);
        
        // Atualiza a interface após entrar na comunidade
        setCommunity((prev: CommunityProps | null) => prev ? ({
            ...prev,
            isMember: true, // Esconde o botão
            memberCount: (prev.memberCount || 0) + 1 // Atualiza o contador visualmente
        }) : null);

        setNotification({ message: 'Você entrou na comunidade!', type: 'success' });

    } catch (error) {
        if (error instanceof Error) {
            setNotification({ message: error.message, type: 'error' });
        }
    }
  };

  if (!community) return <div>Comunidade não encontrada</div>;

  return (
    <S.PageWrapper>
      <Sidebar />

      {notification && (
        <Toast
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)} 
        />
      )}

      <S.MainContent>
        <S.Banner />
        
        <S.HeaderContainer>
          <S.Avatar /> 
          <S.HeaderInfo>
            <h1>{community.name}</h1>
            <span>{community.memberCount} membros</span>
          </S.HeaderInfo>

          <S.HeaderActions>
            {!community.isMember && (
            <S.JoinButton onClick={handleJoin}>
                Join
            </S.JoinButton>
            )}
            <S.OptionsButton>
                <FiMoreHorizontal />
            </S.OptionsButton>
          </S.HeaderActions>
        </S.HeaderContainer>

        <S.ContentGrid>
          <S.FeedColumn>
            {posts.map(post => (
              <S.FeedCardWrapper key={post.projectID || post.id}>
                <Postcard post={post} showMenu={false} />
              </S.FeedCardWrapper>
            ))}
          </S.FeedColumn>

          <S.InfoSidebar>
            <h3>DESCRIPTION</h3>
            <p>{community.description}</p>

            <h3>KEYWORDS</h3>
            <S.KeywordsContainer>
              {community.technologies?.map((keyword: string) => (
                <S.KeywordTag key={keyword}>{keyword}</S.KeywordTag>
              ))}
            </S.KeywordsContainer>
          </S.InfoSidebar>
        </S.ContentGrid>
      </S.MainContent>
    </S.PageWrapper>
  );
}