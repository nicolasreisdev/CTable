import React, { useState, useRef, useEffect } from 'react';
import Sidebar from '../../components/layout/Sidebar'; 
import Postcard from '../../components/domain/Postcard'; 
import * as S from './styles'; 
import * as D from '../../components/common/Dropdown/styles';
import type { ProjectProps } from '../../API/Project';
import type { CommentProps } from '../../API/Comment';
import { GetUserProjects } from '../../API/Project';
import { GetUserComments, DeleteComment } from '../../API/Comment';
import { useAuth } from '../../API/AuthContext';
import { useNavigate } from 'react-router-dom';
import { DeleteProfile, UpdateProfile } from '../../API/User';
import Toast from '../../components/common/Toast';
import Modal from '../../components/common/Modal';
import * as ModalS from '../../components/common/Modal/styles';

// --- ÍCONES ---
const PostsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><line x1="10" y1="9" x2="8" y2="9" />
  </svg>
);
const CommentsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);
const SettingsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" />
  </svg>
);
// -----------------------

type ViewState = 'posts' | 'comments';

export default function Profile() {
  const { currentUser, logout } = useAuth();
  const [view, setView] = useState<ViewState>('posts');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  // Estados para os dados da API
  const [userPosts, setUserPosts] = useState<ProjectProps[]>([]);
  const [userComments, setUserComments] = useState<CommentProps[]>([]);

  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeleteProfileModalOpen, setIsDeleteProfileModalOpen] = useState(false);
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'error'} | null>(null);

  useEffect(() => {
    // Função assíncrona para buscar todos os dados
    console.log("Efeito de busca de dados do perfil disparado.");
    const fetchProfileData = async () => {
      try {;
        
        console.log("Usuário atual no Profile:", currentUser);
        const apiUserPosts = await GetUserProjects();
        
        const apiUserComments: CommentProps[] = await GetUserComments();
        
        setUserPosts(apiUserPosts);
        setUserComments(apiUserComments);

      } catch (error) {
        console.error("Falha ao buscar dados do perfil:", error);
      } 
      
    };
    if(currentUser)
      fetchProfileData();
  }, [currentUser]); 

  // Lógica para fechar o menu ao clicar fora 
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  const handleDeleteComment = async (commentId: string) => {
      await DeleteComment(commentId);
      
      // Remove o comentário deletado do estado local para sumir da tela instantaneamente
      setUserComments((prevComments) => 
          prevComments.filter(comment => comment.commentID !== commentId)
      );
  };

  const handleEditProfile = () => {
      setIsMenuOpen(false);
      navigate('/editProfile');
  };

  const handleDeleteProfile = async () => {
    
    if (isDeleting) return;
    setIsDeleting(true);

      try {
          await DeleteProfile();
          setNotification({ message: "Perfil excluído com sucesso. Até logo!", type: 'success' });

          setIsDeleteProfileModalOpen(false);
          
          setTimeout(() => {
              logout(); // Desloga o usuário e limpa o storage
              navigate('/login'); // Manda para login
          }, 2000);

      } catch (error) {
          if (error instanceof Error) {
              if (error.message.includes("não encontrado") || error.message.includes("not found")) {
                  setNotification({ message: "Conta já encerrada. Redirecionando...", type: 'success' });
                  setTimeout(() => { logout(); navigate('/login'); }, 2000);
                  return;
              }
              setNotification({ message: error.message, type: 'error' });
          }
          setIsDeleteProfileModalOpen(false);
      } finally {
          setIsDeleting(false);
          setIsDeleteProfileModalOpen(false);
      }
  };

  // Função para renderizar o feed (posts ou comentários)
  const renderFeed = () => {
    if (view === 'posts') {
      if (userPosts.length === 0) {
        return <p style={{ color: '#fff', padding: '20px' }}>Nenhum projeto encontrado.</p>;
      }

     return userPosts.map((post, index) => (
        <S.PostContainer key={index}>
          <Postcard post={post} showMenu={true} />
        </S.PostContainer>
      ));
    }

    if (view === 'comments') {
      // Mapeia 'userComments' 
      return userComments.map(comment => (
        <S.PostContainer key={comment.commentID || Math.random()}>
          <Postcard 
            post={{
              id: comment.commentID,
              title: `Comentou em: ${comment.projectTitle || 'Projeto'}`, 
              description: comment.content, 
              technologies: [],
              status: '',
              startDate: comment.createdAt,
              // Passa o usuário atual como autor para o cabeçalho do card
              author: { title: currentUser?.username || 'Você' } 
            } as any} 
            showMenu={true} 
            deleteLabel="Comentário"
            onDelete={() => handleDeleteComment(comment.commentID!)}
          />
        </S.PostContainer>
      ));
    }

    return null;
  };

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

      <S.ContentWrapper>

        <S.ProfileHeader>
            <S.ActionsWrapper ref={menuRef}>
                <S.ProfileActions>
                    <S.IconButton
                        title="Ver publicações"
                        $active={view === 'posts'}
                        onClick={() => setView('posts')}
                        >
                        <PostsIcon />
                    </S.IconButton>
                    <S.IconButton
                        title="Ver comentários"
                        $active={view === 'comments'}
                        onClick={() => setView('comments')}
                        >
                        <CommentsIcon />
                    </S.IconButton>
                    <S.IconButton
                        title="Configurações"
                        onClick={() => setIsMenuOpen(prev => !prev)}
                        >
                        <SettingsIcon />
                    </S.IconButton>
                </S.ProfileActions>

                {isMenuOpen && (
                <D.DropdownMenu>
                    <D.MenuItem onClick={handleEditProfile}>Editar Perfil</D.MenuItem>
                    <D.MenuItem onClick={logout}>Sair</D.MenuItem>
                    <D.Separator />
                    <D.DangerMenuItem onClick={() => {
                        setIsMenuOpen(false);
                        setIsDeleteProfileModalOpen(true);
                    }}>
                        Excluir Perfil
                    </D.DangerMenuItem>
                </D.DropdownMenu>
                )}

            </S.ActionsWrapper>                
        </S.ProfileHeader>
        
        <S.ProfileInfo>
            <S.ProfileAvatar 
              style={{ 
                backgroundImage: undefined 
              }} 
            />
            <S.Username>{currentUser?.username || 'Carregando...'}</S.Username>
        </S.ProfileInfo>

        <S.PostList>
          {renderFeed()}
        </S.PostList>
        
      </S.ContentWrapper>

      <Modal 
        isOpen={isDeleteProfileModalOpen} 
        onClose={() => !isDeleting && setIsDeleteProfileModalOpen(false)}
        title="Excluir Conta"
      >
        <div style={{ textAlign: 'center' }}>
            <p style={{ marginBottom: '24px', color: '#555' }}>
                Tem certeza que deseja excluir sua conta? <br/>
                <strong>Todos os seus projetos, comunidades e comentários serão apagados permanentemente.</strong>
            </p>
            <ModalS.ModalActions>
                <ModalS.ChoiceButton 
                  onClick={() => setIsDeleteProfileModalOpen(false)}
                  disabled={isDeleting}>
                    Cancelar
                </ModalS.ChoiceButton>
                <ModalS.ChoiceButton 
                    onClick={handleDeleteProfile} 
                    style={{ backgroundColor: '#e74c3c' }}
                    disabled={isDeleting}
                >
                    {isDeleting ? 'Excluindo...' : 'Excluir Conta'}
                </ModalS.ChoiceButton>
            </ModalS.ModalActions>
        </div>
      </Modal>

    </S.PageWrapper>
  );
}