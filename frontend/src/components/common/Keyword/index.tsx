import React from 'react';
import * as S from './styles';

// Props que o componente Keyword aceita
interface KeywordProps {
  children: React.ReactNode;
  onRemove: () => void;
}

export const Keyword: React.FC<KeywordProps> = ({ children, onRemove }) => {
  return (
    <S.KeywordTag>
      {children}
      <S.KeywordRemoveButton onClick={onRemove} aria-label={`Remover ${children}`}>
        &times;
      </S.KeywordRemoveButton>
    </S.KeywordTag>
  );
};

export const KeywordContainer = S.KeywordContainer;