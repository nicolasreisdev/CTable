import styled from 'styled-components';

// Container flutuante do menu
export const DropdownMenu = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  
  background-color: ${props => props.theme.background};
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  min-width: 220px;
  padding: 8px;
  z-index: 5; 
`;

// Item de menu padrão (botão)
export const MenuItem = styled.button`
  display: block;
  width: 100%;
  background: none;
  border: none;
  text-align: left;
  padding: 10px 12px;
  border-radius: 4px;
  cursor: pointer;
  
  color: ${props => props.theme.title};
  font-weight: 500;
  font-size: 0.9em;

  &:hover {
    background-color: ${props => props.theme['gray-100']};
  }
`;

// Item de menu de "perigo" (vermelho)
export const DangerMenuItem = styled(MenuItem)`
  color: #f44336; /* Vermelho para exclusão */

  &:hover {
    background-color: #f443361a; /* Vermelho claro no hover */
  }
`;

// Linha separadora
export const Separator = styled.hr`
  height: 1px;
  border: none;
  background-color: ${props => props.theme.placeholder};
  opacity: 0.3;
  margin: 6px 0;
`;