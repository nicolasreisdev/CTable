import React from 'react';
import * as S from './styles';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) {
    return null;
  }

  // Impede que o clique no modal feche o modal (só o overlay)
  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <S.ModalOverlay onClick={onClose}>
      <S.ModalContent onClick={handleContentClick}>
        <S.CloseButton onClick={onClose}>&times;</S.CloseButton>
        <S.ModalTitle>{title}</S.ModalTitle>
        {children}
      </S.ModalContent>
    </S.ModalOverlay>
  );
};

export default Modal;