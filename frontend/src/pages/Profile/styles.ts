import styled from 'styled-components';

// Wrapper para a página inteira
export const PageWrapper = styled.div`
  background: linear-gradient(135deg, ${props => props.theme['gray-100']} 0%, ${props => props.theme['gray-100'] || props.theme['gray-100']} 100%);
  min-height: 100vh;
`;

// Wrapper para o conteúdo principal
export const ContentWrapper = styled.main`
  margin-left: 250px; 
  box-sizing: border-box;
  padding-bottom: 60px;
`;

// Container principal com posts
export const PostContainer = styled.main`
    width: 100%;
    max-width: 800px; 
    margin: 0 auto; 
    
    background-color: ${props => props.theme.background};
    border-radius: 16px;
    padding: 24px;
    box-sizing: border-box;
    
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04),
                0 1px 2px rgba(0, 0, 0, 0.06);
    
    transition: all 0.3s ease;
    
    &:hover {
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08),
                    0 2px 4px rgba(0, 0, 0, 0.06);
        transform: translateY(-2px);
    }
`;

// Lista que agrupa os posts do perfil
export const PostList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 32px 24px;
  
  animation: fadeIn 0.4s ease-out;
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

// Cabeçalho do perfil
export const ProfileHeader = styled.header`
  background: linear-gradient(135deg, ${props => props.theme.button} 0%, ${props => props.theme['hover-button'] || props.theme.button} 100%);
  height: 160px;
  position: relative;
  z-index: 0;
  
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  
  /* Padrão decorativo sutil */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
    pointer-events: none;
  }
  
  /* Posiciona os botões de ação */
  display: flex;
  justify-content: flex-end; 
  align-items: flex-end; 
  padding: 20px 32px; 
`;

// Container da foto + nome
export const ProfileInfo = styled.div`
  display: flex;
  align-items: flex-end; 
  gap: 20px;
  
  margin-top: -70px; 
  margin-left: 32px; 
  padding-bottom: 24px;
  position: relative; 
  z-index: 1; 
  pointer-events: none; 
  
  animation: slideUp 0.5s ease-out;
  
  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  /* Reativa pointer-events apenas nos elementos internos */
  > * {
    pointer-events: auto;
  }
`;

// A foto de perfil circular
export const ProfileAvatar = styled.div`
  width: 120px; 
  height: 120px;
  border-radius: 50%;
  background: linear-gradient(135deg, ${props => props.theme.sidebar} 0%, ${props => props.theme.button} 100%);
  border: 5px solid ${props => props.theme.background}; 
  background-size: cover;
  background-position: center;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15),
              0 2px 8px rgba(0, 0, 0, 0.1);
  
  position: relative;
  flex-shrink: 0;
  
  /* Efeito de brilho sutil */
  &::after {
    content: '';
    position: absolute;
    top: 10%;
    left: 10%;
    width: 40%;
    height: 40%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%);
    border-radius: 50%;
  }
  
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2),
                0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

// O nome do usuário
export const Username = styled.h1`
  font-size: 2.5em;
  font-weight: 700;
  color: ${props => props.theme.title}; 
  margin: 0 0 10px 0; /* Margem inferior para alinhar com a base do avatar */
  
  background: linear-gradient(135deg, ${props => props.theme.title} 0%, ${props => props.theme.subtitle} 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 60px;
    height: 4px;
    background: linear-gradient(90deg, ${props => props.theme.button} 0%, transparent 100%);
    border-radius: 2px;
  }
`;

// Container dos 3 botões de ação (dentro do banner)
export const ProfileActions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  position: relative;
  z-index: 3;
  
  /* Backdrop blur para destacar os botões */
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 8px;
  border-radius: 50px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

// Botão de ícone
export const IconButton = styled.button<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  
  background-color: ${props => props.$active 
    ? props.theme['hover-button'] || props.theme.button
    : props.theme.background};
  color: ${props => props.$active 
    ? '#FFFFFF'
    : props.theme.button}; 

  box-shadow: ${props => props.$active
    ? '0 4px 12px rgba(0, 0, 0, 0.15), inset 0 1px 2px rgba(255, 255, 255, 0.1)'
    : '0 2px 8px rgba(0, 0, 0, 0.08)'};
  
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  /* Efeito ripple */
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: ${props => props.$active 
      ? 'rgba(255, 255, 255, 0.3)'
      : 'rgba(0, 0, 0, 0.1)'};
    transform: translate(-50%, -50%);
    transition: width 0.6s, height 0.6s;
  }

  &:hover::before {
    width: 100%;
    height: 100%;
  }

  &:hover {
    transform: translateY(-3px) scale(1.05);
    box-shadow: ${props => props.$active
      ? '0 6px 20px rgba(0, 0, 0, 0.2)'
      : '0 4px 16px rgba(0, 0, 0, 0.12)'};
    background-color: ${props => props.$active 
      ? props.theme['hover-button'] || props.theme.button
      : props.theme['gray-500'] || props.theme.background};
  }

  &:active {
    transform: translateY(-1px) scale(1.02);
  }

  svg {
    width: 22px;
    height: 22px;
    position: relative;
    z-index: 1;
    transition: transform 0.2s ease;
  }

  &:hover svg {
    transform: ${props => props.$active ? 'rotate(5deg)' : 'scale(1.1)'};
  }
`;

// Menus de ações flutuantes
export const ActionsWrapper = styled.div`
  position: relative; 
  z-index: 5; /* Aumentado para ficar acima de tudo */
`;