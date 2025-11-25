import React from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../../components/layout/Sidebar';
import Postcard from '../../components/domain/Postcard';
import * as S from './styles';
import { FiMoreHorizontal } from 'react-icons/fi'; 
import { useEffect, useState } from 'react';
import { GetCommunityById } from '../../API/Community';

export default function CommunityPage() {
  const { communityId } = useParams<{ communityId: string }>();

  const [community, setCommunity] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
        if (!communityId) return;
        try {
            setLoading(true);
            const data = await GetCommunityById(communityId);
            setCommunity(data.community);
            setPosts(data.posts);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }
    loadData();
  }, [communityId]);

  if (loading) return <div>Carregando...</div>;
  if (!community) return <div>Comunidade não encontrada</div>;

  return (
    <S.PageWrapper>
      <Sidebar />
      <S.MainContent>
        <S.Banner />
        
        <S.HeaderContainer>
          <S.Avatar /> 
          <S.HeaderInfo>
            <h1>{community.name}</h1>
            <span>{community.memberCount} membros</span>
          </S.HeaderInfo>

          <S.HeaderActions>
            <S.JoinButton>Join</S.JoinButton>
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