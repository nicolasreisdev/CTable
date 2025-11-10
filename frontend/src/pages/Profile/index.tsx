import React, { useState, useRef, useEffect } from 'react';
import Sidebar from '../../components/layout/Sidebar';
import Postcard from '../../components/domain/Postcard'; 
import * as S from './styles'; 
import * as D from '../../components/common/Dropdown/styles';

// Ícone de Publicações (FileText)
const PostsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><line x1="10" y1="9" x2="8" y2="9" />
  </svg>
);
// Ícone de Comentários (MessageSquare)
const CommentsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);
// Ícone de Configurações (MoreHorizontal)
const SettingsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" />
  </svg>
);

// --- DADOS MOCKADOS ---
// (Você buscaria isso da sua API)
const mockUser = {
  username: 'ceci',
  avatarUrl: '' // Deixe vazio para usar o placeholder de cor
};

const mockPosts = [
    {
        id: '1',
        community: { name: 'r/React', avatarUrl: '' },
        author: { name: 'ceci' },
        content: 'Este é um post que eu fiz sobre React na minha página de perfil!'
    },
    {
        id: '2',
        community: { name: 'r/Node', avatarUrl: '' },
        author: { name: 'ceci' },
        content: 'Outro post, desta vez sobre Node.js.'
    }
];

const mockComments = [
    {
        id: '3',
        community: { name: 'r/Python', avatarUrl: '' },
        author: { name: 'ceci' },
        content: 'Este é um *comentário* que eu fiz e que aparece aqui. O Postcard é bem flexível.'
    }
];
// -----------------------

type ViewState = 'posts' | 'comments';

export default function Profile() {
  const [view, setView] = useState<ViewState>('posts');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Logica para fechar o menu ao clicar fora
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
                    <D.MenuItem onClick={() => alert('Editar')}>Editar</D.MenuItem>
                    <D.MenuItem onClick={() => alert('Sair')}>Sair</D.MenuItem>
                    <D.Separator />
                    <D.DangerMenuItem onClick={() => alert('Excluir Post')}>
                        Excluir Post
                    </D.DangerMenuItem>
                    <D.DangerMenuItem onClick={() => alert('Excluir Comentário')}>
                        Excluir Comentário
                    </D.DangerMenuItem>
                    <D.DangerMenuItem onClick={() => alert('Excluir Perfil')}>
                        Excluir Perfil
                    </D.DangerMenuItem>
                </D.DropdownMenu>
                )}

            </S.ActionsWrapper>                
        </S.ProfileHeader>
        <S.ProfileInfo>
            <S.ProfileAvatar /* style={{ backgroundImage: `url(${mockUser.avatarUrl})` }} */ />
            <S.Username>{mockUser.username}</S.Username>
        </S.ProfileInfo>

        
        <S.PostList>
          {view === 'posts' && mockPosts.map(post => (
            <S.PostContainer>
                <Postcard key={post.id} post={post} />
            </S.PostContainer>
          ))}
          {view === 'comments' && mockComments.map(comment => (
            <S.PostContainer>
                <Postcard key={comment.id} post={comment} />
            </S.PostContainer>
          ))}
        </S.PostList>
        
      </S.ContentWrapper>
    </S.PageWrapper>
  );
}