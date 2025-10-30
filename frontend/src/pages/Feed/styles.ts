import styled from 'styled-components';

// Wrapper para a página inteira
export const PageWrapper = styled.div`
    background-color: ${props => props.theme['gray-100']};
    min-height: 100vh;
`;

// Wrapper para o conteúdo principal
export const ContentWrapper = styled.main`
    margin-left: 250px; 
    margin-top: 60px;  
    
    padding: 24px;
    box-sizing: border-box;
`;

// Container principal do feed com posts
export const FeedContainer = styled.main`
    width: 100%;
    max-width: 800px; 
    margin: 0 auto; 
    
    background-color: ${props => props.theme.background};
    border-radius: 24px;
    padding: 24px;
    box-sizing: border-box;
`;

// Lista que agrupa os posts
export const PostList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px; 
`;