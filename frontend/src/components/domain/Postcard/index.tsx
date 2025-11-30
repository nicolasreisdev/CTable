import React, { useState, useRef, useEffect } from 'react';
import * as S from './styles';
import * as D from '../../common/Dropdown/styles'; 
import { useNavigate } from 'react-router-dom'; 
import type { ProjectProps } from '../../../API/Project';
import { DeleteProject } from '../../../API/Project';
import Modal from '../../common/Modal';
import type { NotificationState } from '../../common/Toast';
import Toast from '../../common/Toast';
import * as ModalS from '../../common/Modal/styles';
import { CreateComment, GetComments } from '../../../API/Comment';
import type { CommentProps } from '../../../API/Comment';

// Ícone de Comentário (Balão)
const CommentIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
  </svg>
);


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

  // Estados para o formulário de comentário
  const [isCommentBoxOpen, setIsCommentBoxOpen] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const MAX_COMMENT_CHARS = 500;
  const [comments, setComments] = useState<CommentProps[]>([]);

  const projectId = (post as any).id || (post as any).projectID;

  useEffect(() => {
    if (isCommentBoxOpen && projectId) {
        loadComments();
    }
  }, [isCommentBoxOpen, projectId]);

  async function loadComments() {
      try {
          const data = await GetComments(projectId);
          setComments(data);
      } catch (error) {
          console.error("Erro ao carregar comentários", error);
      }
  }

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
    const projectId = (post as any).id || (post as any).projectID;
    
    if (projectId) {
        navigate(`/editProject/${projectId}`, { state: { projectToEdit: post } });
    } else {
        console.error("Erro: ID do projeto não encontrado no objeto:", post);
    }
  };

  const handleDeleteProject = async () => {
    try {
       console.log("Excluindo projeto");
       const projectId = (post as any).id || (post as any).projectID;
       if (!projectId) {
         throw new Error("ID do projeto não encontrado.");
       }
       await DeleteProject(projectId);
       
       setNotification({ message: 'Projeto excluído com sucesso!', type: 'success' });
       
       setTimeout(() => {
         navigate('/feed');
       }, 1000);

    } catch (error) {
      console.error("Erro ao excluir", error);
      setNotification({ message: 'Erro ao excluir projeto.', type: 'error' });
    }
  };
  
  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!projectId) {
        setNotification({ message: 'Erro: Projeto sem ID.', type: 'error' });
        return;
    }

    if (!commentText.trim()) return;

    try {
        setIsSubmittingComment(true);
        await CreateComment(projectId, commentText);
        
        setNotification({ message: 'Comentário enviado!', type: 'success' });
        setCommentText(""); // Limpa o campo
        setIsCommentBoxOpen(false); 

    } catch (error) {
        if (error instanceof Error) {
            setNotification({ message: error.message, type: 'error' });
        }
    } finally {
        setIsSubmittingComment(false);
    }
  };

  const formatDate = (dateString?: string) => {
      if (!dateString) return "";
      return new Date(dateString).toLocaleDateString('pt-BR', {
          day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit'
      });
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
        <img src={(post as any).avatarUrl || 'url_placeholder_avatar.png'} alt={post.title} /> 
        <span>{post.title}</span> 
        {/* Assumindo que você tenha um autor no post */}
        <small>• {(post as any).author?.title || 'Autor'}</small> 
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

        <S.ActionRow>
            <S.ActionButton onClick={() => setIsCommentBoxOpen(!isCommentBoxOpen)}>
                <CommentIcon />
                <span>Comentar</span>
            </S.ActionButton>
        </S.ActionRow>

        {isCommentBoxOpen && (
            <>
                <S.CommentForm onSubmit={handleCommentSubmit}>
                    <S.CommentTextArea 
                        placeholder="Escreva seu comentário..."
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        maxLength={MAX_COMMENT_CHARS}
                        disabled={isSubmittingComment}
                    />
                    <S.CommentFooter>
                        <S.CharacterCount isLimit={commentText.length >= MAX_COMMENT_CHARS}>
                            {commentText.length} / {MAX_COMMENT_CHARS}
                        </S.CharacterCount>
                        <S.SubmitCommentButton 
                            type="submit" 
                            disabled={isSubmittingComment || !commentText.trim()}
                        >
                            {isSubmittingComment ? 'Enviando...' : 'Enviar'}
                        </S.SubmitCommentButton>
                    </S.CommentFooter>
                </S.CommentForm>

                {/* LISTA DE COMENTÁRIOS */}
                {comments.length > 0 && (
                    <S.CommentsSection>
                        {comments.map((comment) => (
                            <S.CommentItem key={comment.commentID || Math.random()}>
                                <S.CommentAvatar /> {/* Pode adicionar avatarUrl do autor se tiver */}
                                <S.CommentBubble>
                                    <S.CommentHeader>
                                        <strong>{comment.username || "Usuário"}</strong>
                                        <span>{formatDate(comment.createdAt)}</span>
                                    </S.CommentHeader>
                                    <S.CommentText>{comment.content}</S.CommentText>
                                </S.CommentBubble>
                            </S.CommentItem>
                        ))}
                    </S.CommentsSection>
                )}
            </>
        )}

      </S.PostContent>
      <Modal 
          isOpen={isDeleteModalOpen} 
          onClose={() => setIsDeleteModalOpen(false)}
          title="Excluir Projeto"
        >
          {/* Conteúdo interno do Modal */}
          <div style={{ textAlign: 'center' }}>
              <p style={{ marginBottom: '24px', color: '#555' }}>
                  Tem certeza que deseja excluir permanentemente o projeto <strong>{post.title}</strong>?
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