import styled from 'styled-components';

export const PostCardWrapper = styled.div`
    width: 100%;

    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }
`;

// Cabeçalho com comunidade e autor
export const PostHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;
    padding-left: 8px; 

    img {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background-color: ${props => props.theme['gray-500']};
    }

    /* Nome da Comunidade */
    span {
        font-weight: bold;
        color: ${props => props.theme.black};
    }

    /* Nome do Autor */
    small {
        color: ${props => props.theme['gray-700']};
        font-size: 0.9em;
    }
`;

// Balão de contéudo do post
export const PostContent = styled.div`
    background-color: ${props => props.theme.placeholder};
    border-radius: 12px;
    padding: 16px;
    
    /* --- INÍCIO DA MODIFICAÇÃO --- */
    position: relative; /* CRUCIAL: para o menu absoluto */
    /* --- FIM DA MODIFICAÇÃO --- */

    p {
        margin: 0;
        font-size: 14px;
        line-height: 1.5;
        color: ${props => props.theme.black};
        /* Adiciona espaço para o botão não sobrepor o texto */
        padding-right: 30px; 
    }
`;
export const PostAuthorInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;

    img {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background-color: ${props => props.theme['gray-500']};
    }

    /* Nome da Comunidade */
    span {
        font-weight: bold;
        color: ${props => props.theme.black};
    }

    /* Nome do Autor */
    small {
        color: ${props => props.theme['gray-700']};
        font-size: 0.9em;
    }
`;

// Wrapper para o botão de menu (para posicionamento)
export const MenuWrapper = styled.div`
  position: absolute; /* Posicionado relativo ao PostContent */
  top: 10px;          /* Espaçamento do topo */
  right: 10px;        /* Espaçamento da direita */
  z-index: 2; 
`;

// Botão de menu (ícone de 3 pontos)
export const MenuButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px; // Área de clique
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  
  color: ${props => props.theme['gray-100']}; 
  opacity: 0.5;

  &:hover {
    background-color: rgba(0,0,0, 0.1); /* Um hover leve */
    opacity: 1;
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

export const ActionRow = styled.div`
  display: flex;
  align-items: center;
  padding-top: 12px;
  gap: 16px;
  border-top: 1px solid ${props => props.theme.placeholder}33; /* Linha sutil separando */
  margin-top: 12px;
`;

export const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  background: none;
  border: none;
  cursor: pointer;
  color: ${props => props.theme['gray-100']};
  font-size: 0.9em;
  font-weight: 600;
  transition: color 0.2s;

  &:hover {
    color: ${props => props.theme.button};
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

// Container para o formulário de comentário
export const CommentForm = styled.form`
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  animation: fadeIn 0.3s ease;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-5px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

export const CommentTextArea = styled.textarea`
  width: 100%;
  min-height: 80px;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid ${props => props.theme.placeholder};
  background-color: ${props => props.theme.white};
  color: ${props => props.theme.black};
  font-family: inherit;
  resize: vertical;
  outline: none;

  &:focus {
    border-color: ${props => props.theme.button};
    box-shadow: 0 0 0 2px ${props => props.theme.button}33;
  }
`;

export const CommentFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CharacterCount = styled.span<{ isLimit?: boolean }>`
  font-size: 0.8em;
  color: ${props => props.isLimit ? props.theme['red-500'] : props.theme['gray-100']};
`;

export const SubmitCommentButton = styled.button`
  padding: 6px 16px;
  background-color: ${props => props.theme.button};
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  font-size: 0.85em;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: ${props => props.theme['hover-button']};
  }
`;

export const CommentsSection = styled.div`
  margin-top: 20px;
  border-top: 1px solid ${props => props.theme.placeholder}55;
  padding-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const CommentItem = styled.div`
  display: flex;
  gap: 12px;
  align-items: flex-start;
`;

export const CommentAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${props => props.theme['gray-300']};
  flex-shrink: 0;
`;

export const CommentBubble = styled.div`
  background-color: ${props => props.theme['gray-100']};
  padding: 10px 14px;
  border-radius: 12px;
  border-top-left-radius: 2px; /* Dá um estilo de balão de fala */
  flex: 1;
`;

export const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
  
  strong {
    font-size: 0.9em;
    color: ${props => props.theme.black};
  }
  
  span {
    font-size: 0.75em;
    color: ${props => props.theme['gray-500']};
  }
`;

export const CommentText = styled.p`
  font-size: 0.9em !important; /* Força sobre o estilo genérico do PostContent */
  color: ${props => props.theme['gray-700']} !important;
  margin: 0 !important;
  line-height: 1.4 !important;
  padding: 0 !important; /* Remove padding do p do PostContent */
`;

export const DeleteCommentButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0 4px;
  color: ${props => props.theme['red-500'] || '#e74c3c'};
  opacity: 0.6;
  transition: opacity 0.2s;
  display: flex;
  align-items: center;

  &:hover {
    opacity: 1;
  }

  svg {
    width: 14px;
    height: 14px;
  }
`;