import styled from "styled-components";

// Wrapper para a página inteira
export const PageWrapper = styled.div`
    background-color: ${props => props.theme['gray-100']};
    min-height: 100vh;
`;

export const HomePageContainer = styled.div`
  min-height: 100vh; /* Garante que ocupe a altura total da viewport */
  display: flex;
  justify-content: center; /* Centraliza horizontalmente */
  align-items: center; /* Centraliza verticalmente */
  background-color: ${props => props.theme['home-background']}; /* Cor de fundo personalizada */
  color: ${props => props.theme.white}; /* Cor padrão do texto */
  font-family: 'Montserrat', sans-serif; 
  text-align: center; 
  padding: 20px; 
  box-sizing: border-box;
`;

export const ContentWrapper = styled.div`
  max-width: 800px; /* Limita a largura do conteúdo para melhor legibilidade */
  margin: 0 auto; /* Centraliza o wrapper se o max-width for atingido */
`;

export const SiteTitle = styled.h1`
  font-size: 4.5em; 
  font-weight: 700; 
  color: ${props => props.theme.title}; 
  margin-bottom: 0.2em; 
  line-height: 1.1;

  @media (max-width: 768px) {
    font-size: 3em; 
  }

  @media (max-width: 480px) {
    font-size: 2.2em;
  }
`;

export const Tagline = styled.p`
  font-size: 1.8em; 
  font-weight: 300; 
  color: ${props => props.theme.subtitle}; 
  margin-top: 0;
  line-height: 1.4;

  @media (max-width: 768px) {
    font-size: 1.2em;
  }

  @media (max-width: 480px) {
    font-size: 1em;
  }
`;

