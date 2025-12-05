import styled from 'styled-components';

// Wrapper para a página inteira
export const PageWrapper = styled.div`
    background: linear-gradient(135deg, ${props => props.theme['gray-100']} 0%, ${props => props.theme['gray-100']}f0 100%);
    min-height: 100vh;
    position: relative;
    
    &::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: radial-gradient(circle at 20% 50%, ${props => props.theme.keyword}08 0%, transparent 50%),
                    radial-gradient(circle at 80% 80%, ${props => props.theme.button}08 0%, transparent 50%);
        pointer-events: none;
        z-index: 0;
    }
`;

// Wrapper para o conteúdo principal
export const ContentWrapper = styled.main`
    margin-left: 250px; 
    margin-top: 60px;  
    padding: 32px 24px;
    box-sizing: border-box;
    position: relative;
    z-index: 1;
    animation: fadeIn 0.5s ease-out;

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

    @media (max-width: 768px) {
        margin-left: 0;
        padding: 20px 16px;
    }
`;

// Container principal do feed com posts
export const FeedContainer = styled.main`
    width: 100%;
    max-width: 800px; 
    margin: 0 auto; 
    background: ${props => props.theme.background};
    backdrop-filter: blur(10px);
    border-radius: 20px;
    padding: 28px;
    box-sizing: border-box;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12),
                0 2px 8px rgba(0, 0, 0, 0.08),
                0 0 0 1px ${props => props.theme.placeholder}15;
    position: relative;
    transition: all 0.3s ease;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 3px;

        background-size: 200% 100%;
        border-radius: 20px 20px 0 0;
        animation: gradientShift 3s ease infinite;
    }

    @keyframes gradientShift {
        0%, 100% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
    }

    &:hover {
        box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15),
                    0 4px 12px rgba(0, 0, 0, 0.1),
                    0 0 0 1px ${props => props.theme.placeholder}25;
    }

    @media (max-width: 768px) {
        padding: 20px;
        border-radius: 16px;
    }
`;

// Lista que agrupa os posts
export const PostList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    position: relative;

    /* Animação de entrada para cada post */
    & > * {
        animation: slideInUp 0.4s ease-out backwards;
    }

    & > *:nth-child(1) { animation-delay: 0.05s; }
    & > *:nth-child(2) { animation-delay: 0.1s; }
    & > *:nth-child(3) { animation-delay: 0.15s; }
    & > *:nth-child(4) { animation-delay: 0.2s; }
    & > *:nth-child(5) { animation-delay: 0.25s; }
    
    @keyframes slideInUp {
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

// Mensagem de feed vazio
export const EmptyFeedMessage = styled.div`
    text-align: center;
    padding: 60px 24px;
    color: ${props => props.theme.placeholder};
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;

    svg {
        width: 80px;
        height: 80px;
        opacity: 0.5;
        margin-bottom: 8px;
    }

    h3 {
        color: ${props => props.theme.subtitle};
        font-size: 1.3rem;
        font-weight: 600;
        margin: 0 0 8px 0;
    }

    p {
        color: ${props => props.theme.placeholder};
        font-size: 0.95rem;
        line-height: 1.5;
        max-width: 400px;
        margin: 0;
    }
`;

// Header do feed 
export const FeedHeader = styled.div`
    margin-bottom: 24px;
    padding-bottom: 20px;
    border-bottom: 1px solid ${props => props.theme.placeholder}20;

    h1 {
        color: ${props => props.theme.white};
        font-size: 1.8rem;
        font-weight: 700;
        margin: 0 0 8px 0;
        background: linear-gradient(135deg, ${props => props.theme.white}, ${props => props.theme.subtitle});
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }

    p {
        color: ${props => props.theme.placeholder};
        font-size: 0.9rem;
        margin: 0;
    }
`;

// Container para loading state
export const LoadingContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 60px 24px;
    gap: 16px;

    .spinner {
        width: 40px;
        height: 40px;
        border: 3px solid ${props => props.theme.placeholder}30;
        border-top-color: ${props => props.theme.keyword};
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
    }

    @keyframes spin {
        to { transform: rotate(360deg); }
    }

    p {
        color: ${props => props.theme.placeholder};
        font-size: 0.9rem;
    }
`;