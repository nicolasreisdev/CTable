import styled from 'styled-components';

// Wrapper para a página inteira
export const PageWrapper = styled.div`
  background-color: ${props => props.theme['gray-100']}; 
  min-height: 100vh;
`;

// Wrapper para o conteúdo principal
export const ContentWrapper = styled.main`
  margin-left: 250px; 
  box-sizing: border-box;
`;

// Container principal com posts
export const PostContainer = styled.main`
    width: 100%;
    max-width: 800px; 
    margin: 0 auto; 
    
    background-color: ${props => props.theme.background};
    border-radius: 24px;
    padding: 24px;
    box-sizing: border-box;
`;

// Lista que agrupa os posts do perfil
export const PostList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px; 
`;

// Cabeçalho do perfil
export const ProfileHeader = styled.header`
  background-color: ${props => props.theme.button};
  height: 120px;
  position: relative;
  z-idex: 1;
  
  /* Posiciona os botões de ação */
  display: flex;
  justify-content: flex-end; 
  align-items: flex-end; 
  padding: 16px 24px; 
`;

// Container da foto + nome
export const ProfileInfo = styled.div`
  display: flex;
  align-items: center; 
  gap: 16px;
  
  margin-top: -60px; 
  margin-left: 24px; 
  position: relative; 
  z-index: 2;
`;

// A foto de perfil circular
export const ProfileAvatar = styled.div`
  width: 90px; 
  height: 90px;
  border-radius: 50%;
  background-color: ${props => props.theme.sidebar}; 
  border: 4px solid ${props => props.theme.subtitle}; 
  background-size: cover;
  background-position: center;
`;

// O nome do usuário
export const Username = styled.h1`
  font-size: 2.5em;
  font-weight: 700;
  color: ${props => props.theme.subtitle}; 
  margin: 0 0 10px 0; /* Alinha na base do avatar */
`;

// Container dos 3 botões de ação (dentro do banner)
export const ProfileActions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  position: relative;
  z-index: 3;
`;

// Botão de ícone
export const IconButton = styled.button<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.button}; 

  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  }

  /* Estilo do botão ativo */
  ${props => props.$active && `
    background-color: ${props.theme['hover-button']};
    color: #FFFFFF;
  `}

  svg {
    width: 20px;
    height: 20px;
  }
`;

// Menus de ações flutuantes
export const ActionsWrapper = styled.div`
  position: relative; 
  z-index: 4; 
`;