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

export const Banner = styled.div`
  width: 100%;
  height: 200px;
  background: linear-gradient(135deg, ${props => props.theme.sidebar} 0%, ${props => props.theme.button} 100%);
  position: relative;
  overflow: hidden;
  
  /* Padrão decorativo */
  &::before {
    content: '';
    position: absolute;
    top: -40%;
    right: -15%;
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.12) 0%, transparent 70%);
    border-radius: 50%;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -35%;
    left: -8%;
    width: 350px;
    height: 350px;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, transparent 70%);
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

export const ProjectIcon = styled.div`
  width: 130px;
  height: 130px;
  border-radius: 20px;
  background: linear-gradient(135deg, ${props => props.theme.white} 0%, ${props => props.theme['gray-100'] || props.theme.white} 100%);
  border: 5px solid ${props => props.theme.white};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3.5rem;
  color: ${props => props.theme.button};
  font-weight: 800;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15),
              0 4px 12px rgba(0, 0, 0, 0.1);
  flex-shrink: 0;
  position: relative;
  
  /* Efeito de brilho */
  &::after {
    content: '';
    position: absolute;
    top: 12%;
    left: 12%;
    width: 30%;
    height: 30%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.6) 0%, transparent 70%);
    border-radius: 50%;
  }
  
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2),
                0 6px 16px rgba(0, 0, 0, 0.15);
  }
`;

export const HeaderInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 12px;
  flex: 1;
  gap: 12px;
  min-width: 0;

  h1 {
    font-size: 2.8rem;
    font-weight: 800;
    color: ${props => props.theme.black};
    margin: 0;
    margin-bottom: 6px;
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
      bottom: -8px;
      left: 0;
      width: 70px;
      height: 4px;
      background: linear-gradient(90deg, ${props => props.theme.button} 0%, transparent 100%);
      border-radius: 2px;
    }
  }

  span {
    color: ${props => props.theme['gray-600'] || props.theme['gray-500']};
    font-size: 1rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 8px 16px;
    background: ${props => props.theme['gray-100']};
    border-radius: 20px;
    width: fit-content;
    
    strong {
      color: ${props => props.theme.button};
      font-weight: 700;
    }
  }
`;

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

export const MainColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  
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
  
  h2 {
    font-size: 1.8rem;
    font-weight: 700;
    color: ${props => props.theme.title};
    margin: 0;
    padding-left: 16px;
    position: relative;
    
    /* Barra lateral decorativa */
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 5px;
      height: 28px;
      background: linear-gradient(180deg, ${props => props.theme.button} 0%, ${props => props.theme['hover-button'] || props.theme.button} 100%);
      border-radius: 3px;
    }
  }
`;

export const DescriptionBox = styled.div`
  background: ${props => props.theme.white};
  padding: 28px;
  border-radius: 16px;
  line-height: 1.7;
  color: ${props => props.theme['gray-700']};
  white-space: pre-wrap;
  font-size: 1rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04),
              0 1px 4px rgba(0, 0, 0, 0.06);
  border: 1px solid ${props => props.theme.placeholder}15;
  word-wrap: break-word;
  overflow-wrap: break-word;
  word-break: break-word;
  
  transition: box-shadow 0.3s ease;
  
  &:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08),
                0 2px 6px rgba(0, 0, 0, 0.06);
  }
`;

export const InfoSidebar = styled.aside`
  background: ${props => props.theme.white};
  border: 2px solid ${props => props.theme.button}25;
  border-radius: 20px;
  padding: 28px;
  height: fit-content;
  position: sticky;
  top: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  
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
    margin-bottom: 14px;
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
      height: 16px;
      background: linear-gradient(180deg, ${props => props.theme.button} 0%, ${props => props.theme['hover-button'] || props.theme.button} 100%);
      border-radius: 2px;
    }
  }

  h3:first-child {
    margin-top: 0;
  }
  
  /* Estilo para o container de data */
  > div {
    padding-left: 12px;
    margin-bottom: 8px;
    
    span {
      color: ${props => props.theme['gray-700']};
      font-weight: 600;
      font-size: 0.95rem;
    }
    
    svg {
      color: ${props => props.theme.button};
    }
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

export const StatusBadge = styled.div<{ status: string }>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  border-radius: 12px;
  font-weight: 700;
  font-size: 0.9rem;
  text-transform: capitalize;
  margin-top: 4px;
  margin-left: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
  
  /* Indicador colorido (bolinha) */
  &::before {
    content: '';
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: currentColor;
    box-shadow: 0 0 8px currentColor;
    animation: pulse 2s ease-in-out infinite;
  }
  
  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.6;
    }
  }
  
  /* Cores baseadas no status */
  ${props => {
    if (props.status === 'finalizado') {
      return `
        background: linear-gradient(135deg, ${props.theme['green-300'] || '#4ade80'} 0%, ${props.theme['green-500'] || '#22c55e'} 100%);
        color: ${props.theme.white};
      `;
    } else if (props.status === 'em-andamento') {
      return `
        background: linear-gradient(135deg, ${props.theme['yellow-500'] || '#fbbf24'} 0%, ${props.theme['yellow-500'] || '#f59e0b'} 100%);
        color: ${props.theme.white};
      `;
    } else {
      return `
        background: linear-gradient(135deg, ${props.theme['gray-300'] || '#d1d5db'} 0%, ${props.theme['gray-400'] || '#9ca3af'} 100%);
        color: ${props.theme.white};
      `;
    }
  }}
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;