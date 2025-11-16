import styled from 'styled-components';

// Fundo escuro semi-transparente que cobre a tela
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

// Card 
export const ModalContent = styled.div`
  background: ${props => props.theme.background}; /* Cor de fundo clara */
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 400px;
  z-index: 1001;
`;

// Título 
export const ModalTitle = styled.h2`
  color: ${props => props.theme.title}; /* Cor escura do título */
  font-size: 1.5em;
  font-weight: 700;
  text-align: center;
  margin-top: 0;
  margin-bottom: 24px;
`;

// Container para os botões de escolha
export const ModalActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

// Botão de escolha
export const ChoiceButton = styled.button`
  padding: 15px 20px;
  font-size: 1.1em;
  font-weight: 600;
  color: #FFFFFF;
  background-color: ${props => props.theme.button}; /* Roxo principal */
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${props => props.theme['hover-button']};
  }
`;

// Botão de fechar (o 'X' no canto)
export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5em;
  color: ${props => props.theme.placeholder};
  cursor: pointer;

  &:hover {
    color: ${props => props.theme.title};
  }
`;