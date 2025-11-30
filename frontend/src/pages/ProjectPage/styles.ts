import styled from 'styled-components';

// Reutiliza a estrutura base da Comunidade
export const PageWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: ${props => props.theme.white}; 
`;

export const MainContent = styled.main`
  flex: 1;
  margin-left: 250px; 
  display: flex;
  flex-direction: column;
`;

export const Banner = styled.div`
  width: 100%;
  height: 180px;
  background-color: ${props => props.theme.button};
  background: linear-gradient(180deg, ${props => props.theme.sidebar} 0%, ${props => props.theme.button} 100%);
`;

export const HeaderContainer = styled.div`
  display: flex;
  align-items: flex-end;
  padding: 0 32px;
  margin-top: -50px; 
  margin-bottom: 32px;
  gap: 24px;
`;

// Placeholder para ícone do projeto
export const ProjectIcon = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 16px; /* Quadrado arredondado diferente da comunidade */
  background-color: ${props => props.theme.white};
  border: 4px solid ${props => props.theme['gray-100']};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: ${props => props.theme.button};
  font-weight: bold;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
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
    font-size: 1rem;
    font-weight: 500;
  }
`;

export const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 300px; 
  gap: 24px;
  padding: 0 32px 32px 32px;
  max-width: 1200px;
  width: 100%;
  box-sizing: border-box;
`;

// Coluna Esquerda: Descrição Completa e Comentários
export const MainColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const DescriptionBox = styled.div`
  background-color: ${props => props.theme['gray-100']};
  padding: 24px;
  border-radius: 12px;
  line-height: 1.6;
  color: ${props => props.theme['gray-700']};
  white-space: pre-wrap; /* Preserva quebras de linha */
`;

// Sidebar Direita: Metadados
export const InfoSidebar = styled.aside`
  background-color: ${props => props.theme.white};
  border: 1px solid ${props => props.theme.button};
  border-radius: 16px;
  padding: 24px;
  height: fit-content;
  
  h3 {
    color: ${props => props.theme.title};
    font-size: 0.9rem;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
    margin-bottom: 12px;
    margin-top: 24px;
  }

  h3:first-child {
    margin-top: 0;
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
  padding: 4px 12px;
  font-size: 0.85rem;
  font-weight: 600;
`;

export const StatusBadge = styled.div<{ status: string }>`
  display: inline-block;
  padding: 6px 12px;
  border-radius: 8px;
  font-weight: bold;
  font-size: 0.9rem;
  text-transform: capitalize;
  margin-top: 4px;
  
  /* Cores baseadas no status */
  background-color: ${props => 
    props.status === 'finalizado' ? props.theme['green-300'] :
    props.status === 'em-andamento' ? props.theme['yellow-500'] :
    props.theme['gray-300']
  };
  color: ${props => props.theme.white};
`;