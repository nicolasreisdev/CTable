import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import * as S from './styles';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  // Bloqueia o scroll do body quando o modal está aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  // Impede que o clique no modal feche o modal (só o overlay)
  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return createPortal(
    <S.ModalOverlay onClick={onClose}>
      <S.ModalContent onClick={handleContentClick}>
        <S.CloseButton onClick={onClose}>&times;</S.CloseButton>
        <S.ModalTitle>{title}</S.ModalTitle>
        {children}
      </S.ModalContent>
    </S.ModalOverlay>,
    document.body
  );
};

export default Modal;