import React, { useState, useRef, useEffect } from 'react';
import * as S from './styles';
import * as D from '../../common/Dropdown/styles'; 
import { useNavigate } from 'react-router-dom'; 
import type { ProjectProps } from '../../../API/Project';
import Modal from '../../common/Modal';
import type { NotificationState } from '../../common/Toast';
import Toast from '../../common/Toast';
import * as ModalS from '../../common/Modal/styles';


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
  const navigate = useNavigate(); // Inicialize o hook de navegação
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Estado para o modal de exclusão
  const [notification, setNotification] = useState<NotificationState | null>(null);

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

  const handleDeleteProject = async () => {
    try {
       console.log("Excluindo projeto");
       // await DeleteProject(projectId);
       
       setNotification({ message: 'Projeto excluído com sucesso!', type: 'success' });
       
       setTimeout(() => {
         navigate('/feed');
       }, 1000);

    } catch (error) {
      console.error("Erro ao excluir", error);
      setNotification({ message: 'Erro ao excluir projeto.', type: 'error' });
    }
  };

  return (
    <S.PostCardWrapper>
      {notification && (
        <Toast
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)} 
        />
      )}
      
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
                <D.DangerMenuItem onClick={() => {
                    setIsMenuOpen(false);
                    setIsDeleteModalOpen(true);}}>
                    Excluir
                </D.DangerMenuItem>
              </D.DropdownMenu>
            )}
          </S.MenuWrapper>
        )}

        <p>{post.description}</p>
      </S.PostContent>
<Modal 
        isOpen={isDeleteModalOpen} 
        onClose={() => setIsDeleteModalOpen(false)}
        title="Excluir Projeto"
      >
        {/* Conteúdo interno do Modal */}
        <div style={{ textAlign: 'center' }}>
            <p style={{ marginBottom: '24px', color: '#555' }}>
                Tem certeza que deseja excluir permanentemente o projeto <strong>{post.name}</strong>?
            </p>

            <ModalS.ModalActions>
                <ModalS.ChoiceButton 
                    onClick={() => setIsDeleteModalOpen(false)}>
                    Cancelar
                </ModalS.ChoiceButton>

                {/* Botão Confirmar (Vermelho/Perigo) */}
                <ModalS.ChoiceButton 
                    onClick={handleDeleteProject}
                    style={{ backgroundColor: '#e74c3c' }} // Inline override para cor de erro
                >
                    Excluir
                </ModalS.ChoiceButton>
            </ModalS.ModalActions>
        </div>
      </Modal>

    </S.PostCardWrapper>
  );
}