import React, { useState, useRef, useEffect } from 'react';
import Sidebar from '../../components/layout/Sidebar'; 
import Postcard from '../../components/domain/Postcard'; 
import * as S from './styles'; 
import * as D from '../../components/common/Dropdown/styles';
import type { ProjectProps } from '../../API/Project';
import type { CommentProps } from '../../API/Comment';

// 3. Tipagem do Usuário
type UserProps = {
  username: string;
  avatarUrl: string;
};

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
  const [view, setView] = useState<ViewState>('posts');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Estados para os dados da API
  const [user, setUser] = useState<UserProps | null>(null);
  const [userPosts, setUserPosts] = useState<ProjectProps[]>([]);
  const [userComments, setUserComments] = useState<CommentProps[]>([]);

  // Simulação de chamada de API (useEffect)
  useEffect(() => {
    // Função assíncrona para buscar todos os dados
    const fetchProfileData = async () => {
      try {;

        // Dados que viriam da sua API
        const apiUserData: UserProps = {
          username: 'ceci',
          avatarUrl: '' // URL da imagem do avatar
        };
        
        const apiUserPosts: ProjectProps[] = [
          {
            name: 'Projeto CTable (React)',
            description: 'Este é o projeto que estamos construindo agora!',
            technologies: ['React', 'TypeScript', 'Node.js'],
            status: 'em-andamento',
            date: '10/11/2025'
          },
          {
            name: 'API de Análise de Dados',
            description: 'Um backend em Python para análise.',
            technologies: ['Python', 'Django'],
            status: 'finalizado',
            date: '01/08/2025'
          }
        ];
        
        const apiUserComments: CommentProps[] = [
          {
            name: 'Comentário em r/react',
            description: 'Ótima sugestão sobre o `useNavigate`!',
            technologies: [], status: '', date: '' 
          }
        ];
        
        // Atualiza os estados
        setUser(apiUserData);
        setUserPosts(apiUserPosts);
        setUserComments(apiUserComments);

      } catch (error) {
        console.error("Falha ao buscar dados do perfil:", error);
      } 
    };

    fetchProfileData();
  }, []); // O array vazio [] garante que isso rode apenas uma vez

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

  // Função para renderizar o feed (posts ou comentários)
  const renderFeed = () => {

    if (view === 'posts') {
      // Mapeia 'userPosts' e passa o 'post' (ProjectProps)
      return userPosts.map(post => (
        <S.PostContainer >
          <Postcard post={post} showMenu={true} />
        </S.PostContainer>
      ));
    }

    if (view === 'comments') {
      // Mapeia 'userComments' 
      return userComments.map(comment => (
        <S.PostContainer >
          <Postcard post={comment as any} showMenu={true} />
        </S.PostContainer>
      ));
    }

    return null;
  };

  return (
    <S.PageWrapper>
      <Sidebar />
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
                    <D.MenuItem onClick={() => alert('Editar Perfil')}>Editar Perfil</D.MenuItem>
                    <D.MenuItem onClick={() => alert('Sair')}>Sair</D.MenuItem>
                    <D.Separator />
                    <D.DangerMenuItem onClick={() => alert('Excluir Perfil')}>
                        Excluir Perfil
                    </D.DangerMenuItem>
                </D.DropdownMenu>
                )}

            </S.ActionsWrapper>                
        </S.ProfileHeader>
        
        <S.ProfileInfo>
            <S.ProfileAvatar 
              style={{ 
                backgroundImage: user?.avatarUrl ? `url(${user.avatarUrl})` : undefined 
              }} 
            />
            <S.Username>{user ? user.username : '...'}</S.Username>
        </S.ProfileInfo>

        <S.PostList>
          {renderFeed()}
        </S.PostList>
        
      </S.ContentWrapper>
    </S.PageWrapper>
  );
}