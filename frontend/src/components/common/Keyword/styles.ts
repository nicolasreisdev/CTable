import styled from 'styled-components';

// Container que mostra as tags/keywords selecionadas 
export const KeywordContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

// Tag/keyword individual
export const KeywordTag = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  background-color: #fff;
  /* Cor da borda baseada na sua paleta */
  border: 2px solid ${props => props.theme.keyword}; 
  border-radius: 9999px;
  padding: 6px 12px;
  font-size: 0.9em;
  font-weight: 600;
  /* Cor do texto baseada na sua paleta */
  color: ${props => props.theme.keyword}; 
`;

// Botão de remoção 'x' na tag/keyword
export const KeywordRemoveButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
  color: ${props => props.theme.placeholder};
  font-weight: bold;
  font-size: 1.1em;
  line-height: 1;

  &:hover {
    color: ${props => props.theme.title};
  }
`;