import styled from 'styled-components';

export const PostCardWrapper = styled.div`
    width: 100%;
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
  
  /* Cor sutil que combine com o balão */
  color: ${props => props.theme.black}; 
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