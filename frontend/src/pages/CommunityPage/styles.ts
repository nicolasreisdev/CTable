import styled from 'styled-components';

export const PageWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  background: linear-gradient(135deg, ${props => props.theme.white} 0%, ${props => props.theme['gray-100'] || props.theme['gray-100']} 100%);
`;

export const MainContent = styled.main`
  flex: 1;
  margin-left: 250px;
  display: flex;
  flex-direction: column;
  
  animation: fadeIn 0.5s ease-out;
  
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

// --- Área do Topo (Banner + Avatar + Título) ---

export const Banner = styled.div`
  width: 100%;
  height: 220px;
  background: linear-gradient(135deg, ${props => props.theme.button} 0%, ${props => props.theme['hover-button'] || props.theme.placeholder} 100%);
  position: relative;
  overflow: hidden;
  
  /* Padrão decorativo com formas geométricas */
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -10%;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, transparent 70%);
    border-radius: 50%;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -30%;
    left: -5%;
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
    border-radius: 50%;
  }
`;

export const HeaderContainer = styled.div`
  display: flex;
  align-items: flex-end;
  padding: 0 40px;
  margin-top: -60px;
  margin-bottom: 32px;
  gap: 24px;
  position: relative;
  z-index: 2;
  flex-wrap: wrap;
  
  animation: slideUp 0.6s ease-out;
  
  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const Avatar = styled.img`
  width: 130px;
  height: 130px;
  border-radius: 24px; /* Identicons ficam ótimos quadrados com bordas arredondadas */
  
  /* Garante que a imagem não distorça */
  object-fit: cover;
  
  /* Cor de fundo enquanto carrega */
  background-color: ${props => props.theme.sidebar};
  
  border: 5px solid ${props => props.theme.white};
  flex-shrink: 0;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2),
              0 4px 12px rgba(0, 0, 0, 0.15);
  
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: scale(1.05) rotate(2deg);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.25),
                0 6px 16px rgba(0, 0, 0, 0.2);
  }
`;

export const HeaderInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 12px;
  flex: 1;
  gap: 14px;
  min-width: 0;

  h1 {
    font-size: 2.8rem;
    font-weight: 800;
    color: ${props => props.theme.black};
    margin: 0;
    margin-bottom: 8px;
    line-height: 1.1;
    letter-spacing: -0.02em;
    
    background: linear-gradient(135deg, ${props => props.theme.white} 0%, ${props => props.theme.button} 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    
    position: relative;
    word-wrap: break-word;
    overflow-wrap: break-word;
    
    /* Underline decorativo */
    &::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 0;
      width: 80px;
      height: 5px;
      background: linear-gradient(90deg, ${props => props.theme.button} 0%, transparent 100%);
      border-radius: 3px;
    }
  }

  span {
    color: ${props => props.theme['gray-600'] || props.theme['gray-500']};
    font-size: 1rem;
    font-weight: 600;
    padding: 6px 14px;
    background: ${props => props.theme['gray-100']};
    border-radius: 20px;
    width: fit-content;
    display: flex;
    align-items: center;
    gap: 6px;
    
    /* Ícone decorativo */
    &::before {
      content: '👥';
      font-size: 0.9em;
    }
  }
`;

export const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding-bottom: 15px;
`;

export const JoinButton = styled.button`
  padding: 12px 32px;
  border-radius: 12px;
  border: 2px solid ${props => props.theme.button};
  background: ${props => props.theme.button};
  color: ${props => props.theme.white};
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 12px ${props => props.theme.button}40;
  position: relative;
  overflow: hidden;
  
  /* Efeito de brilho deslizante */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transition: left 0.5s;
  }
  
  &:hover::before {
    left: 100%;
  }

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px ${props => props.theme.button}50;
    background: ${props => props.theme['hover-button'] || props.theme.button};
  }
  
  &:active {
    transform: translateY(-1px);
  }
`;

export const LeaveButton = styled.button`
  padding: 12px 32px;
  border-radius: 12px;
  border: 2px solid ${props => props.theme['red-500']};
  background: transparent;
  color: ${props => props.theme['red-500']};
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: ${props => props.theme['red-500']};
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: width 0.4s, height 0.4s;
    z-index: -1;
  }

  &:hover::before {
    width: 300%;
    height: 300%;
  }

  &:hover {
    color: ${props => props.theme.white};
    border-color: ${props => props.theme['red-500']};
    box-shadow: 0 4px 16px ${props => props.theme['red-500']}40;
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  > * {
    position: relative;
    z-index: 1;
  }
`;

export const OptionsButton = styled.button`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  border: 2px solid ${props => props.theme.button};
  background: ${props => props.theme.white};
  color: ${props => props.theme.button};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.3rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

  &:hover {
    background-color: ${props => props.theme.button};
    color: ${props => props.theme.white};
    transform: scale(1.1) rotate(90deg);
    box-shadow: 0 4px 16px ${props => props.theme.button}30;
  }
  
  &:active {
    transform: scale(1.05) rotate(90deg);
  }
`;

// --- Grid de Conteúdo (Feed + Info Lateral) ---

export const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 28px;
  padding: 0 40px 40px 40px;
  max-width: 1400px;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const FeedColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  
  animation: slideInLeft 0.5s ease-out;
  
  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

export const FeedCardWrapper = styled.div`
  background: linear-gradient(135deg, ${props => props.theme.background} 0%, ${props => props.theme['gray-100'] || props.theme.background} 100%);
  border-radius: 18px;
  padding: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
  }
`;

// --- Sidebar de Informações (Direita) ---

export const InfoSidebar = styled.aside`
  background: ${props => props.theme.white};
  border: 2px solid ${props => props.theme.button}25;
  border-radius: 20px;
  padding: 28px;
  height: fit-content;
  position: sticky;
  top: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-word;
  
  animation: slideInRight 0.5s ease-out;
  
  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  h3 {
    color: ${props => props.theme.title};
    font-size: 0.85rem;
    font-weight: 800;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    margin-bottom: 16px;
    margin-top: 28px;
    position: relative;
    padding-left: 12px;
    
    /* Barra lateral decorativa */
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 4px;
      height: 18px;
      background: linear-gradient(180deg, ${props => props.theme.button} 0%, ${props => props.theme['hover-button'] || props.theme.button} 100%);
      border-radius: 2px;
    }
  }

  h3:first-child {
    margin-top: 0;
  }

  p {
    color: ${props => props.theme['gray-700'] || props.theme.black};
    font-size: 0.95rem;
    line-height: 1.7;
    margin-bottom: 16px;
    padding-left: 12px;
    word-wrap: break-word;
    overflow-wrap: break-word;
    word-break: break-word;
    white-space: pre-wrap;
  }
`;

export const KeywordsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding-left: 12px;
`;

export const KeywordTag = styled.span`
  border: 2px solid ${props => props.theme.keyword};
  color: ${props => props.theme.keyword};
  border-radius: 10px;
  padding: 8px 18px;
  font-size: 0.85rem;
  font-weight: 700;
  background: ${props => props.theme.keyword}10;
  transition: all 0.2s ease;
  cursor: default;
  
  &:hover {
    background: ${props => props.theme.keyword}20;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px ${props => props.theme.keyword}20;
  }
`;

export const MenuWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  z-index: 10;
`;