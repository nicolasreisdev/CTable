import React, { useState, useRef, useEffect } from 'react';
import * as S from './styles';
import * as D from '../../common/Dropdown/styles'; 
import { useNavigate } from 'react-router-dom'; 
import type { ProjectProps } from '../../../API/Project';

// --- Ícone de Menu (Ellipsis) ---
const EllipsisIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" />
  </svg>
);

interface PostcardProps {
  post: ProjectProps; 
  showMenu: boolean;         // Verifica se o menu deve ser mostrado (se é dono do post)
}

// --- Componente Postcard ---
export default function Postcard({ post, showMenu }: PostcardProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate(); // 4. Inicialize o hook de navegação

  // Lógica para fechar o menu ao clicar fora (sem alterações)
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

  const handleEditClick = () => {
    // Navega para a página de edição e passa o objeto 'post' (projeto)
    // O 'state' é uma forma segura de passar os dados
    navigate(`/editProject/${post.name}`, { state: { projectToEdit: post } });
  };

  return (
    <S.PostCardWrapper>
      
      <S.PostHeader>
        <img src={(post as any).avatarUrl || 'url_placeholder_avatar.png'} alt={post.name} /> 
        <span>{post.name}</span> 
        {/* Assumindo que você tenha um autor no post */}
        <small>• {(post as any).author?.name || 'Autor'}</small> 
      </S.PostHeader>

      <S.PostContent>
        {showMenu && (
          <S.MenuWrapper ref={menuRef}>
            <S.MenuButton onClick={() => setIsMenuOpen(prev => !prev)}>
              <EllipsisIcon />
            </S.MenuButton>

            {isMenuOpen && (
              <D.DropdownMenu>
                <D.MenuItem onClick={handleEditClick}>Editar</D.MenuItem>
                <D.DangerMenuItem onClick={() => alert('Excluir post')}>
                  Excluir
                </D.DangerMenuItem>
              </D.DropdownMenu>
            )}
          </S.MenuWrapper>
        )}

        <p>{post.description}</p>
      </S.PostContent>
    </S.PostCardWrapper>
  );
}