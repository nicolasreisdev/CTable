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
import { CreateComment, GetComments, DeleteComment } from '../../../API/Comment';
import type { CommentProps } from '../../../API/Comment';
import { useAuth } from '../../../API/AuthContext';
import { getAvatarUrl } from '../../../utils/getAvatarurl';

const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
  </svg>
);

// Ícone de Comentário (Balão)
const CommentIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
  </svg>
);


// Ícone de Menu (Ellipsis)
const EllipsisIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" />
  </svg>
);

interface PostcardProps {
  post: ProjectProps; 
  showMenu: boolean;         // Verifica se o menu deve ser mostrado (se é dono do post)
  onDelete?: (id: string) => Promise<void>; 
  deleteLabel?: string;
}

export default function Postcard({ post, showMenu, onDelete, deleteLabel = 'Projeto' }: PostcardProps) {
  const { currentUser } = useAuth();

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

  const [commentToDelete, setCommentToDelete] = useState<string | null>(null);

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

  const handleEditClick = () => {
    const projectId = (post as any).id || (post as any).projectID;
    
    if (projectId) {
        navigate(`/editProject/${projectId}`, { state: { projectToEdit: post } });
    } else {
        console.error("Erro: ID do projeto não encontrado no objeto:", post);
    }
  };

  const handleDeleteMainItem = async () => {
    try {
       const id = (post as any).id || (post as any).projectID || (post as any).commentID;
       
       if (!id) throw new Error("ID não encontrado.");

       if (onDelete) {
           await onDelete(id);
       } else {
           await DeleteProject(id);
           setTimeout(() => navigate('/feed'), 1000);
       }
       
       setNotification({ message: `${deleteLabel} excluído com sucesso!`, type: 'success' });
       setIsDeleteModalOpen(false);

    } catch (error) {
      setNotification({ message: `Erro ao excluir ${deleteLabel?.toLowerCase()}.`, type: 'error' });
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

  const handleConfirmDeleteInternalComment = async () => {
    if (!commentToDelete) return;
    try {
        await DeleteComment(commentToDelete);
        setNotification({ message: 'Comentário excluído.', type: 'success' });
        setCommentToDelete(null); 
        await loadComments(); 
    } catch (error: any) {
        setNotification({ message: error.message, type: 'error' });
        setCommentToDelete(null);
    }
  };

  const handleCardClick = (e: React.MouseEvent) => {
    // Não navega se estiver na aba de comentários do perfil
    if (deleteLabel !== 'Projeto') return;

    // Não navega se o clique foi em um elemento interativo
    const target = e.target as HTMLElement;
    
    // Verifica se clicou em botões, inputs, links ou no próprio menu
    if (
        target.closest('button') || 
        target.closest('input') || 
        target.closest('textarea') ||
        target.closest('a') ||
        target.closest(D.DropdownMenu as any) // Garante que itens do dropdown não disparem
    ) {
        return;
    }

    // Realiza a navegação
    if (projectId) {
        navigate(`/project/${projectId}`);
    }
  };

  const formatDate = (dateString?: string) => {
      if (!dateString) return "";
      return new Date(dateString).toLocaleDateString('pt-BR', {
          day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit'
      });
  };

  return (
    <S.PostCardWrapper onClick={handleCardClick}>
      {notification && (
        <Toast
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)} 
        />
      )}
      
      <S.PostHeader>
        <img // Tenta usar o username do autor como "semente". 
          // Se não tiver, tenta o título do autor ou usa 'visitante' como fallback.
          src={getAvatarUrl(post.authorUsername || (post as any).author?.title || 'visitante')} 
          alt="Avatar do autor"
          // Garante que fique redondinho igual ao perfil
          style={{ borderRadius: '50%', objectFit: 'cover', width: '40px', height: '40px' }}
        /> 
        <span>{post.title}</span> 
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
                {deleteLabel === 'Projeto' && (
                    <D.MenuItem onClick={handleEditClick}>Editar</D.MenuItem>
                )}
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
                        {comments.map((comment) => {
                            // Verifica se o usuário atual é o autor do comentário
                            const isAuthor = currentUser?.id && String(currentUser.id) === String(comment.authorID);

                            return (
                                <S.CommentItem key={comment.commentID || Math.random()}>
                                    <S.CommentAvatar /> 
                                    <S.CommentBubble>
                                        <S.CommentHeader>
                                            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                                <strong>{comment.username || "Usuário"}</strong>
                                                <span>{formatDate(comment.createdAt)}</span>
                                            </div>
                                            
                                            {/* Botão de Deletar (Só aparece para o dono) */}
                                            {isAuthor && (
                                                <S.DeleteCommentButton 
                                                    onClick={() => setCommentToDelete(comment.commentID!)}
                                                    title="Excluir comentário"
                                                >
                                                    <TrashIcon />
                                                </S.DeleteCommentButton>
                                            )}
                                        </S.CommentHeader>
                                        <S.CommentText>{comment.content}</S.CommentText>
                                    </S.CommentBubble>
                                </S.CommentItem>
                            );
                        })}
                    </S.CommentsSection>
                )}
            </>
        )}

      </S.PostContent>
      <Modal 
        isOpen={isDeleteModalOpen} 
        onClose={() => setIsDeleteModalOpen(false)}
        title={`Excluir ${deleteLabel}`}
      >
        <div style={{ textAlign: 'center' }}>
            <p style={{ marginBottom: '24px', color: '#555' }}>
                Tem certeza que deseja excluir este {deleteLabel?.toLowerCase()}?
            </p>
            <ModalS.ModalActions>
                <ModalS.ChoiceButton onClick={() => setIsDeleteModalOpen(false)}>
                    Cancelar
                </ModalS.ChoiceButton>
                <ModalS.ChoiceButton onClick={handleDeleteMainItem} style={{ backgroundColor: '#e74c3c' }}>
                    Excluir
                </ModalS.ChoiceButton>
            </ModalS.ModalActions>
        </div>
      </Modal>

      <Modal 
        isOpen={!!commentToDelete} 
        onClose={() => setCommentToDelete(null)}
        title="Excluir Comentário"
      >
        <div style={{ textAlign: 'center' }}>
            <p style={{ marginBottom: '24px', color: '#555' }}>
                Deseja realmente apagar este comentário?
            </p>
            <ModalS.ModalActions>
                <ModalS.ChoiceButton onClick={() => setCommentToDelete(null)}>
                    Cancelar
                </ModalS.ChoiceButton>
                <ModalS.ChoiceButton 
                    onClick={handleConfirmDeleteInternalComment}
                    style={{ backgroundColor: '#e74c3c' }}
                >
                    Excluir
                </ModalS.ChoiceButton>
            </ModalS.ModalActions>
        </div>
      </Modal>

    </S.PostCardWrapper>
  );
}