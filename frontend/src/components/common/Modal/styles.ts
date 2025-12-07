import styled from 'styled-components';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  bottom: 0 !important;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(8px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  animation: fadeIn 0.25s ease-out;
  margin: 0 !important;
  padding: 0 !important;
  transform: none !important;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const ModalContent = styled.div`
  background: ${props => props.theme.background};
  padding: 32px;
  border-radius: 20px;
  box-shadow: 
    0 20px 60px rgba(0, 0, 0, 0.3),
    0 0 0 1px rgba(255, 255, 255, 0.1);
  width: 90%;
  max-width: 440px;
  position: relative;
  z-index: 10000;
  animation: slideUp 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: center;
  margin: 0 auto;

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(30px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  /* Efeito de brilho sutil */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100px;
    background: linear-gradient(
      180deg,
      ${props => props.theme.button}08 0%,
      transparent 100%
    );
    border-radius: 20px 20px 0 0;
    pointer-events: none;
  }
`;

export const ModalTitle = styled.h2`
  color: ${props => props.theme.title};
  font-size: 1.65em;
  font-weight: 700;
  text-align: center;
  margin: 0 0 28px 0;
  letter-spacing: -0.02em;
  position: relative;
  
  /* Linha decorativa abaixo do título */
  &::after {
    content: '';
    position: absolute;
    bottom: -12px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 4px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      ${props => props.theme.button} 50%,
      transparent 100%
    );
    border-radius: 2px;
  }
`;

export const ModalActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 24px;
`;

export const ChoiceButton = styled.button`
  padding: 16px 24px;
  font-size: 1.05em;
  font-weight: 700;
  color: #FFFFFF;
  background: linear-gradient(
    135deg,
    ${props => props.theme.button} 0%,
    ${props => props.theme['hover-button']} 100%
  );
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 
    0 4px 12px ${props => props.theme.button}40,
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  position: relative;
  overflow: hidden;

  /* Efeito de brilho no hover */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(255, 255, 255, 0.2) 50%,
      transparent 100%
    );
    transition: left 0.5s ease;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 
      0 8px 20px ${props => props.theme.button}50,
      inset 0 1px 0 rgba(255, 255, 255, 0.3);

    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(0);
    box-shadow: 
      0 2px 8px ${props => props.theme.button}40,
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
  }

  /* Variação para botão de perigo (quando tem background vermelho inline) */
  &[style*="rgb(231, 76, 60)"],
  &[style*="#e74c3c"] {
    background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
    box-shadow: 
      0 4px 12px rgba(231, 76, 60, 0.4),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);

    &:hover {
      box-shadow: 
        0 8px 20px rgba(231, 76, 60, 0.5),
        inset 0 1px 0 rgba(255, 255, 255, 0.3);
    }

    &:active {
      box-shadow: 
        0 2px 8px rgba(231, 76, 60, 0.4),
        inset 0 1px 0 rgba(255, 255, 255, 0.2);
    }
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: ${props => props.theme.placeholder}25;
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  font-size: 1.6em;
  color: ${props => props.theme.placeholder};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  z-index: 10;

  &:hover {
    background: ${props => props.theme['red-500']}15;
    color: ${props => props.theme['red-500'] || '#e74c3c'};
    transform: rotate(90deg) scale(1.1);
  }

  &:active {
    transform: rotate(90deg) scale(0.95);
  }
`;