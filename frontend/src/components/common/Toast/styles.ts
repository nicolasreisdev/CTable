import styled from 'styled-components';

// Dois tipos de alerta: sucesso e erro
interface ToastContainerProps {
  type: 'success' | 'error';
}

// Cores padrão para os tipos de alerta
const alertColors = {
  success: {
    background: '#4CAF50', // Verde
    text: '#FFFFFF',
  },
  error: {
    background: '#f44336', // Vermelho
    text: '#FFFFFF',
  },
};

export const ToastContainer = styled.div<ToastContainerProps>`
  position: fixed;
  top: 25px; /* Posição no topo da tela */
  right: 25px; /* Posição na direita da tela */
  z-index: 9999; /* Garante que fique por cima de tudo */
  
  max-width: 400px;
  width: 90%;
  padding: 16px 24px;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;

  /* Muda a cor de fundo e texto baseado na 'type' */
  background-color: ${props => alertColors[props.type].background};
  color: ${props => alertColors[props.type].text};

  /* Animação de entrada */
  animation: slideIn 0.3s ease-out;

  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;

export const ToastMessage = styled.p`
  margin: 0;
  font-size: 1em;
  font-weight: 500;
  line-height: 1.4;
`;

export const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: inherit;
  font-size: 1.8em;
  font-weight: bold;
  cursor: pointer;
  padding: 0;
  line-height: 1;
  opacity: 0.7;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 1;
  }
`;