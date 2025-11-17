import React, { useEffect } from 'react';
import { ToastContainer, ToastMessage, CloseButton } from './styles';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void; // Função para fechar o toast
}

export interface NotificationState {
  message: string;
  type: 'success' | 'error';
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  
  // Efeito para fechar o toast automaticamente após 5 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000); 

    // Limpa o timer se o componente for desmontado 
    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  return (
    <ToastContainer type={type}>
      <ToastMessage>{message}</ToastMessage>
      <CloseButton onClick={onClose}>
        &times; 
      </CloseButton>
    </ToastContainer>
  );
};

export default Toast;