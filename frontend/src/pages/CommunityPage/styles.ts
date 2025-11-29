import styled from 'styled-components';

export const PageWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: ${props => props.theme.white}; 
`;

export const MainContent = styled.main`
  flex: 1;
  margin-left: 250px; // Espaço para a Sidebar fixa da esquerda
  display: flex;
  flex-direction: column;
`;

// --- Área do Topo (Banner + Avatar + Título) ---

export const Banner = styled.div`
  width: 100%;
  height: 180px;
  background-color: ${props => props.theme.placeholder}; /* Roxo médio/escuro */
  background: linear-gradient(180deg, ${props => props.theme.placeholder} 0%, ${props => props.theme.card} 100%);
`;

export const HeaderContainer = styled.div`
  display: flex;
  align-items: flex-end;
  padding: 0 32px;
  margin-top: -50px; // Faz o conteúdo subir por cima do banner
  margin-bottom: 32px;
  gap: 24px;
`;

export const Avatar = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: ${props => props.theme.sidebar}; /* Roxo bem escuro */
  border: 4px solid ${props => props.theme.white};
  flex-shrink: 0;
`;

export const HeaderInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 10px;
  flex: 1;

  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    color: ${props => props.theme.black};
    margin: 0;
    line-height: 1.2;
  }

  span {
    color: ${props => props.theme['gray-500']};
    font-size: 0.9rem;
  }
`;

export const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding-bottom: 15px;
`;

export const JoinButton = styled.button`
  padding: 8px 24px;
  border-radius: 9999px;
  border: 1px solid ${props => props.theme.button};
  background: transparent;
  color: ${props => props.theme.button};
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${props => props.theme.button};
    color: ${props => props.theme.white};
  }
`;

export const OptionsButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid ${props => props.theme.button};
  background: transparent;
  color: ${props => props.theme.button};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: bold;

  &:hover {
    background-color: ${props => props.theme['gray-100']};
  }
`;

// --- Grid de Conteúdo (Feed + Info Lateral) ---

export const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 320px; // Feed ocupa o resto, Sidebar tem 320px
  gap: 24px;
  padding: 0 32px 32px 32px;
  max-width: 1200px;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 900px) {
    grid-template-columns: 1fr; // Em telas menores, vira uma coluna só
  }
`;

export const FeedColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

// Card roxo claro para envolver os posts 
export const FeedCardWrapper = styled.div`
  background-color: ${props => props.theme.background}; /* Lilás claro */
  border-radius: 16px;
  padding: 8px; /* Um padding pequeno para criar a borda visual */
`;

// --- Sidebar de Informações (Direita) ---

export const InfoSidebar = styled.aside`
  background-color: ${props => props.theme.white};
  border: 1px solid ${props => props.theme.button}; /* Borda roxa */
  border-radius: 16px;
  padding: 24px;
  height: fit-content;
  
  h3 {
    color: ${props => props.theme.title}; /* Roxo título */
    font-size: 1rem;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
    margin-bottom: 12px;
    margin-top: 24px;
  }

  h3:first-child {
    margin-top: 0;
  }

  p {
    color: ${props => props.theme.black};
    font-size: 0.95rem;
    line-height: 1.5;
    margin-bottom: 16px;
  }
`;

export const KeywordsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const KeywordTag = styled.span`
  border: 1px solid ${props => props.theme.keyword};
  color: ${props => props.theme.keyword};
  border-radius: 9999px;
  padding: 6px 16px;
  font-size: 0.85rem;
  font-weight: 700;
  background-color: transparent;
`;

export const MenuWrapper = styled.div`
  position: relative; /* Importante para o DropdownMenu absolute funcionar */
  display: flex;
  align-items: center;
`;