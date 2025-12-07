import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const Container = styled.div<{ fullScreen?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  
  width: 100%;
  height: ${props => props.fullScreen ? '100vh' : '100%'};
  min-height: ${props => props.fullScreen ? 'auto' : '300px'}; 
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 3px solid ${props => props.theme.placeholder}30;
  border-top-color: ${props => props.theme.keyword}; 
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;

const Text = styled.p`
  color: ${props => props.theme.placeholder};
  font-size: 0.9rem;
`;

interface LoadingProps {
  message?: string;
  fullScreen?: boolean;
}

export function Loading({ message = "Carregando...", fullScreen = false }: LoadingProps) {
  return (
    <Container fullScreen={fullScreen}>
      <Spinner />
      <Text>{message}</Text>
    </Container>
  );
}