import styled from 'styled-components';

// O <form> container
export const FormContainer = styled.form`
  background: ${props => props.theme.white};
  border-radius: 24px;
  padding: 40px;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08),
              0 2px 8px rgba(0, 0, 0, 0.04);
  border: 1px solid ${props => props.theme.placeholder}20;
  
  animation: slideUp 0.5s ease-out;
  
  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

// Wrapper para cada par de (label + input)
export const InputGroup = styled.div`
  margin-bottom: 28px;
  width: 100%;
  
  animation: fadeIn 0.4s ease-out backwards;
  animation-delay: calc(var(--index, 0) * 0.05s);
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

// Label 
export const Label = styled.label`
  display: block;
  font-size: 0.95em;
  font-weight: 700;
  color: ${props => props.theme.title}; 
  margin-bottom: 10px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-size: 0.85rem;
  padding-left: 4px;
  
  /* Indicador visual opcional */
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    left: -12px;
    top: 50%;
    transform: translateY(-50%);
    width: 3px;
    height: 14px;
    background: linear-gradient(180deg, ${props => props.theme.button} 0%, ${props => props.theme['hover-button'] || props.theme.button} 100%);
    border-radius: 2px;
    opacity: 0;
    transition: opacity 0.2s ease;
  }
  
  ${InputGroup}:focus-within &::after {
    opacity: 1;
  }
`;

// Input 
export const Input = styled.input`
  width: 100%;
  padding: 14px 20px;
  font-size: 1em;
  
  background-color: ${props => props.theme['gray-100']};
  border: 2px solid transparent;
  border-radius: 12px;
  color: ${props => props.theme.title};
  box-sizing: border-box;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-weight: 500;

  &::placeholder {
    color: ${props => props.theme.placeholder};
    font-weight: 400;
  }
  
  &:hover {
    background-color: ${props => props.theme.white};
    border-color: ${props => props.theme.placeholder}40;
  }
  
  &:focus {
    outline: none;
    background-color: ${props => props.theme.white};
    border-color: ${props => props.theme.button};
    box-shadow: 0 0 0 4px ${props => props.theme.button}15,
                0 2px 8px rgba(0, 0, 0, 0.04);
    transform: translateY(-1px);
  }
`;

export const SelectWrapper = styled.div`
  position: relative;
  width: 100%;

  /* A seta de seleção (CSS) */
  &::after {
    content: '▼';
    font-size: 0.85em;
    color: ${props => props.theme.placeholder};
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    transition: all 0.3s ease;
  }
  
  &:hover::after {
    color: ${props => props.theme.button};
  }
  
  &:focus-within::after {
    color: ${props => props.theme.button};
    transform: translateY(-50%) rotate(180deg);
  }
`;

// Componente de Select 
export const Select = styled.select`
  width: 100%;
  padding: 14px 20px;
  font-size: 1em;
  
  background-color: ${props => props.theme['gray-100']};
  border: 2px solid transparent;
  border-radius: 12px;
  color: ${props => props.theme.title};
  box-sizing: border-box;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-weight: 500;
  cursor: pointer;

  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;

  padding-right: 50px;
  
  &:hover {
    background-color: ${props => props.theme.white};
    border-color: ${props => props.theme.placeholder}40;
  }

  &:focus {
    outline: none;
    background-color: ${props => props.theme.white};
    border-color: ${props => props.theme.button};
    box-shadow: 0 0 0 4px ${props => props.theme.button}15,
                0 2px 8px rgba(0, 0, 0, 0.04);
    transform: translateY(-1px);
  }

  &:invalid {
    color: ${props => props.theme.placeholder};
  }
  
  option {
    padding: 10px;
    background: ${props => props.theme.white};
    color: ${props => props.theme.title};
  }
`;

// Wrapper para o input de busca E a lista de resultados 
export const SearchWrapper = styled.div`
  position: relative;
  width: 100%;
`;

// Lista de resultados de busca que aparece abaixo do input 
export const SearchResultsList = styled.ul`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  background: ${props => props.theme.white};
  border: 2px solid ${props => props.theme.button}20;
  border-radius: 12px;
  max-height: 240px;
  overflow-y: auto;
  margin: 0;
  padding: 6px;
  z-index: 100;
  list-style: none;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12),
              0 2px 8px rgba(0, 0, 0, 0.08);
  
  animation: slideDown 0.2s ease-out;
  
  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  /* Estilização da scrollbar */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme['gray-300']};
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${props => props.theme['gray-400']};
  }
`;

// Item individual na lista de resultados 
export const SearchResultItem = styled.li`
  padding: 12px 16px;
  cursor: pointer;
  border-radius: 8px;
  color: ${props => props.theme.title};
  font-weight: 500;
  transition: all 0.2s ease;
  position: relative;
  
  /* Barra lateral que aparece no hover */
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 3px;
    background: ${props => props.theme.button};
    border-radius: 0 2px 2px 0;
    transform: scaleY(0);
    transition: transform 0.2s ease;
  }

  &:hover {
    background-color: ${props => props.theme['gray-100']};
    padding-left: 20px;
    
    &::before {
      transform: scaleY(1);
    }
  }
  
  &:active {
    background-color: ${props => props.theme['gray-100']};
  }
`;

// Mensagem de erro 
export const ErrorMessage = styled.span`
  font-size: 0.85em;
  margin-top: 8px;
  color: ${props => props.theme['red-500'] || '#ef4444'};
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
  padding-left: 4px;
  
  /* Ícone de alerta */
  &::before {
    content: '⚠';
    font-size: 1.1em;
  }
`;

// Botão de submissão
export const SubmitButton = styled.button`
  padding: 16px 40px;
  font-size: 1.05em;
  font-weight: 700;
  color: ${props => props.theme.white};
  background: linear-gradient(135deg, ${props => props.theme.button} 0%, ${props => props.theme['hover-button'] || props.theme.button} 100%);
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  margin-top: 16px;
  box-shadow: 0 4px 16px ${props => props.theme.button}40;
  position: relative;
  overflow: hidden;
  
  /* Efeito de brilho deslizante */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transition: left 0.5s;
  }
  
  &:hover::before {
    left: 100%;
  }

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 24px ${props => props.theme.button}50;
  }
  
  &:active {
    transform: translateY(-1px);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: 0 2px 8px ${props => props.theme.button}20;
    
    &:hover {
      transform: none;
    }
  }
`;

// Estilo para o campo de texto de várias linhas (Descrição)
export const TextArea = styled.textarea`
  width: 100%;
  padding: 16px 20px;
  font-size: 1em;
  font-family: inherit;
  line-height: 1.6;
  
  background-color: ${props => props.theme['gray-100']};
  border: 2px solid transparent;
  border-radius: 12px;
  color: ${props => props.theme.title};
  box-sizing: border-box;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  resize: vertical;
  min-height: 150px;
  font-weight: 500;

  &::placeholder {
    color: ${props => props.theme.placeholder};
    font-weight: 400;
  }
  
  &:hover {
    background-color: ${props => props.theme.white};
    border-color: ${props => props.theme.placeholder}40;
  }
  
  &:focus {
    outline: none;
    background-color: ${props => props.theme.white};
    border-color: ${props => props.theme.button};
    box-shadow: 0 0 0 4px ${props => props.theme.button}15,
                0 2px 8px rgba(0, 0, 0, 0.04);
    transform: translateY(-1px);
  }
  
  /* Estilização da scrollbar */
  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    background: ${props => props.theme['gray-100']};
    border-radius: 0 10px 10px 0;
  }

  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme['gray-300']};
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${props => props.theme.button};
  }
`;

// Contador de caracteres
export const CharacterCount = styled.div`
  text-align: right;
  font-size: 0.85em;
  color: ${props => props.theme['gray-500'] || props.theme.placeholder};
  margin-top: 6px;
  margin-right: 4px;
  font-weight: 600;
  padding: 4px 8px;
  background: ${props => props.theme['gray-100']};
  border-radius: 6px;
  display: inline-block;
  float: right;
  
  /* Muda de cor quando próximo do limite */
  &[data-warning="true"] {
    color: ${props => props.theme['yellow-600'] || '#d97706'};
    background: ${props => props.theme['yellow-50'] || '#fef3c7'};
  }
  
  &[data-limit="true"] {
    color: ${props => props.theme['red-500'] || '#ef4444'};
    background: ${props =>  '#fee2e2'};
  }
`;