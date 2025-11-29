import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../../components/layout/Sidebar';
import Postcard from '../../components/domain/Postcard';
import * as S from './styles';
import { FiMoreHorizontal } from 'react-icons/fi'; 
import { useEffect, useState, useRef } from 'react';
import { GetCommunityById, JoinCommunity, DeleteCommunity } from '../../API/Community';
import type { NotificationState } from '../../components/common/Toast';
import Toast from '../../components/common/Toast';
import type { CommunityProps } from '../../API/Community';
import * as D from '../../components/common/Dropdown/styles';
import Modal from '../../components/common/Modal';
import * as ModalS from '../../components/common/Modal/styles';

export default function CommunityPage() {
  const { communityID } = useParams<{ communityID: string }>();
  const navigate = useNavigate();

  const [notification, setNotification] = useState<NotificationState | null>(null);
  const [community, setCommunity] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }
    if (isMenuOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

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

  const handleEdit = () => {
    navigate('/editCommunity', { state: { communityToEdit: community } });
  };

  const handleDelete = async () => {
    if (!community) return;
    try {
        await DeleteCommunity(community.communityID);
        setNotification({ message: 'Comunidade excluída com sucesso.', type: 'success' });
        setIsDeleteModalOpen(false);
        
        // Redireciona para home após excluir
        setTimeout(() => {
            navigate('/feed');
        }, 1500);

    } catch (error) {
        if (error instanceof Error) {
            setNotification({ message: error.message, type: 'error' });
        }
        setIsDeleteModalOpen(false);
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
           {community.isAdmin && (
                <S.MenuWrapper ref={menuRef}>
                    <S.OptionsButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        <FiMoreHorizontal />
                    </S.OptionsButton>

                    {isMenuOpen && (
                        <D.DropdownMenu>
                            <D.MenuItem onClick={handleEdit}>
                                Editar Comunidade
                            </D.MenuItem>
                            <D.Separator />
                            <D.DangerMenuItem onClick={() => {
                                setIsMenuOpen(false);
                                setIsDeleteModalOpen(true);
                            }}>
                                Excluir Comunidade
                            </D.DangerMenuItem>
                        </D.DropdownMenu>
                    )}
                </S.MenuWrapper>
            )}
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

      <Modal 
        isOpen={isDeleteModalOpen} 
        onClose={() => setIsDeleteModalOpen(false)}
        title="Excluir Comunidade"
      >
        <div style={{ textAlign: 'center' }}>
            <p style={{ marginBottom: '24px', color: '#555' }}>
                Tem certeza que deseja excluir a comunidade <strong>{community.name}</strong>?<br/>
                Todos os posts e vínculos serão removidos.
            </p>
            <ModalS.ModalActions>
                <ModalS.ChoiceButton onClick={() => setIsDeleteModalOpen(false)}>
                    Cancelar
                </ModalS.ChoiceButton>
                <ModalS.ChoiceButton onClick={handleDelete} style={{ backgroundColor: '#e74c3c' }}>
                    Excluir
                </ModalS.ChoiceButton>
            </ModalS.ModalActions>
        </div>
      </Modal>
    </S.PageWrapper>
  );
}