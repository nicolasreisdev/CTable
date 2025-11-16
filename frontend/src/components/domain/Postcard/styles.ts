import styled from 'styled-components';

export const PostCardWrapper = styled.div`
    width: 100%;
`;

// Cabeçalho com comunidade e autor
export const PostHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;
    padding-left: 8px; 

    img {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background-color: ${props => props.theme['gray-500']};
    }

    /* Nome da Comunidade */
    span {
        font-weight: bold;
        color: ${props => props.theme.black};
    }

    /* Nome do Autor */
    small {
        color: ${props => props.theme['gray-700']};
        font-size: 0.9em;
    }
`;

// Balão de contéudo do post
export const PostContent = styled.div`
    background-color: ${props => props.theme.placeholder};
    border-radius: 12px;
    padding: 16px;

    p {
        margin: 0;
        font-size: 14px;
        line-height: 1.5;
        color: ${props => props.theme.black};
    }
`;