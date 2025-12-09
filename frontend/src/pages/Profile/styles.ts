import styled from 'styled-components';

export const PageWrapper = styled.div`
  background: linear-gradient(135deg, ${props => props.theme['gray-100']} 0%, ${props => props.theme['gray-100']} 100%);
  min-height: 100vh;
`;

export const ContentWrapper = styled.main`
  margin-left: 250px; 
  box-sizing: border-box;
  padding-bottom: 60px;
`;

export const PostList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 32px 24px;
  animation: fadeIn 0.4s ease-out;
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

export const PostContainer = styled.div`
    width: 100%;
    max-width: 800px; 
    margin: 0 auto; 
    border-radius: 16px;
    box-sizing: border-box;
`;

export const ProfileHeader = styled.header`
  background: linear-gradient(135deg, ${props => props.theme.button} 0%, ${props => props.theme['hover-button'] || props.theme.button} 100%);
  height: 160px;
  position: relative;
  z-index: 0;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: flex-end; 
  align-items: flex-end; 
  padding: 20px 32px; 
  
  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background-image: 
      radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
    pointer-events: none;
  }
`;

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
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  > * { pointer-events: auto; }
`;

// --- AQUI ESTÁ A MÁGICA DO AVATAR ---
interface AvatarProps {
  $imageUrl?: string;
}

export const ProfileAvatar = styled.div<AvatarProps>`
  width: 120px; 
  height: 120px;
  border-radius: 50%;
  
  /* Se tiver URL, usa ela. Se não, gradiente. */
  background: ${props => props.$imageUrl 
    ? `url(${props.$imageUrl})` 
    : `linear-gradient(135deg, ${props.theme.sidebar} 0%, ${props.theme.button} 100%)`};
    
  background-color: ${props => props.theme.background}; /* Fundo caso a imagem seja PNG transparente */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  
  border: 5px solid ${props => props.theme.background}; 
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  position: relative;
  flex-shrink: 0;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`;
// -------------------------------------

export const Username = styled.h1`
  font-size: 2.5em;
  font-weight: 700;
  color: ${props => props.theme.title}; 
  margin: 0 0 10px 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  position: relative;
`;

export const ProfileActions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  position: relative;
  z-index: 3;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 8px;
  border-radius: 50px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

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
  color: ${props => props.$active ? '#FFFFFF' : props.theme.button}; 
  box-shadow: ${props => props.$active
    ? '0 4px 12px rgba(0, 0, 0, 0.15)'
    : '0 2px 8px rgba(0, 0, 0, 0.08)'};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px) scale(1.05);
  }
  svg {
    width: 22px;
    height: 22px;
  }
`;

export const ActionsWrapper = styled.div`
  position: relative; 
  z-index: 5;
`;