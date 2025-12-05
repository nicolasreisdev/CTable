import styled from 'styled-components';

export const PostCardWrapper = styled.div`
    width: 100%;
    background: ${props => props.theme.white};
    border-radius: 16px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    overflow: visible;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    border: 1px solid ${props => props.theme.placeholder}40;

    &:hover {
        transform: translateY(-4px);
        box-shadow: 0 12px 24px rgba(0, 0, 0, 0.12);
        border-color: ${props => props.theme.button}40;
    }
`;

export const PostHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 16px 20px;
    background: linear-gradient(135deg, ${props => props.theme.white} 0%, ${props => props.theme.placeholder}20 100%);
    border-bottom: 1px solid ${props => props.theme.placeholder}30;
    border-radius: 16px 16px 0 0;

    img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: linear-gradient(135deg, ${props => props.theme.button}40 0%, ${props => props.theme.button}80 100%);
        border: 2px solid ${props => props.theme.white};
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    span {
        font-weight: 700;
        font-size: 1.05em;
        color: ${props => props.theme.black};
        letter-spacing: -0.02em;
    }

    small {
        color: ${props => props.theme['gray-700']};
        font-size: 0.88em;
        font-weight: 500;
        opacity: 0.8;
        
        &::before {
            content: '•';
            margin: 0 6px;
            opacity: 0.5;
        }
    }
`;

export const PostContent = styled.div`
    background-color: ${props => props.theme.white};
    padding: 20px;
    position: relative;
    border-radius: 0 0 16px 16px;

    p {
        margin: 0;
        font-size: 15px;
        line-height: 1.6;
        color: ${props => props.theme['gray-700']};
        padding-right: 50px;
        letter-spacing: 0.01em;
        word-wrap: break-word;
        overflow-wrap: break-word;
        word-break: break-word;
        white-space: pre-wrap;
    }
`;

export const PostAuthorInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;

    img {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background-color: ${props => props.theme['gray-500']};
    }

    span {
        font-weight: bold;
        color: ${props => props.theme.black};
    }

    small {
        color: ${props => props.theme['gray-700']};
        font-size: 0.9em;
    }
`;

export const MenuWrapper = styled.div`
    position: absolute;
    top: 16px;
    right: 16px;
    z-index: 10;
`;

export const MenuButton = styled.button`
    background: ${props => props.theme.placeholder}30;
    border: none;
    cursor: pointer;
    padding: 8px;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    color: ${props => props.theme.button};
    transition: all 0.2s ease;
    
    &:hover {
        background: ${props => props.theme.button}60;
        color: ${props => props.theme['hover-button']};
        transform: scale(1.05);
    }

    &:active {
        transform: scale(0.95);
    }

    svg {
        width: 20px;
        height: 20px;
    }
`;

export const ActionRow = styled.div`
    display: flex;
    align-items: center;
    padding-top: 16px;
    gap: 12px;
    border-top: 1px solid ${props => props.theme.placeholder}25;
    margin-top: 16px;
`;

export const ActionButton = styled.button`
    display: flex;
    align-items: center;
    gap: 8px;
    background: ${props => props.theme.placeholder}25;
    border: none;
    cursor: pointer;
    color: ${props => props.theme.button};
    font-size: 0.9em;
    font-weight: 600;
    padding: 8px 16px;
    border-radius: 8px;
    transition: all 0.2s ease;

    &:hover {
        background: ${props => props.theme.button}55;
        color: ${props => props.theme['hover-button']};
        transform: translateY(-1px);
    }

    &:active {
        transform: translateY(0);
    }

    svg {
        width: 18px;
        height: 18px;
    }
`;

export const CommentForm = styled.form`
    margin-top: 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 16px;
    background: ${props => props.theme.placeholder}15;
    border-radius: 12px;
    border: 2px dashed ${props => props.theme.placeholder}50;
    animation: slideDown 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    @keyframes slideDown {
        from { 
            opacity: 0; 
            transform: translateY(-10px);
            max-height: 0;
        }
        to { 
            opacity: 1; 
            transform: translateY(0);
            max-height: 500px;
        }
    }
`;

export const CommentTextArea = styled.textarea`
    width: 100%;
    min-height: 90px;
    padding: 14px;
    border-radius: 10px;
    border: 2px solid ${props => props.theme.placeholder}40;
    background-color: ${props => props.theme.white};
    color: ${props => props.theme.black};
    font-family: inherit;
    font-size: 14px;
    resize: vertical;
    outline: none;
    transition: all 0.2s ease;
    box-sizing: border-box;

    &::placeholder {
        color: ${props => props.theme['gray-500']};
    }

    &:focus {
        border-color: ${props => props.theme.button};
        box-shadow: 0 0 0 4px ${props => props.theme.button}15;
        background-color: ${props => props.theme.white};
    }
`;

export const CommentFooter = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const CharacterCount = styled.span<{ isLimit?: boolean }>`
    font-size: 0.82em;
    font-weight: 600;
    padding: 4px 8px;
    border-radius: 6px;
    background: ${props => props.isLimit ? props.theme['red-500']+'15' : props.theme.placeholder}30;
    color: ${props => props.isLimit ? props.theme['red-500'] : props.theme['gray-500']};
    transition: all 0.2s ease;
`;

export const SubmitCommentButton = styled.button`
    padding: 10px 24px;
    background: linear-gradient(135deg, ${props => props.theme.button} 0%, ${props => props.theme['hover-button']} 100%);
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: 700;
    cursor: pointer;
    font-size: 0.9em;
    box-shadow: 0 4px 12px ${props => props.theme.button}30;
    transition: all 0.2s ease;

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        transform: none;
        box-shadow: none;
    }

    &:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 6px 16px ${props => props.theme.button}40;
    }

    &:active:not(:disabled) {
        transform: translateY(0);
    }
`;

export const CommentsSection = styled.div`
    margin-top: 20px;
    padding-top: 20px;
    border-top: 2px solid ${props => props.theme.placeholder}25;
    display: flex;
    flex-direction: column;
    gap: 16px;
    animation: fadeIn 0.4s ease;
    max-width: 100%;

    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
`;

export const CommentItem = styled.div`
    display: flex;
    gap: 12px;
    align-items: flex-start;
    max-width: 100%;
    animation: slideIn 0.3s ease;

    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateX(-10px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;

export const CommentAvatar = styled.div`
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: linear-gradient(135deg, ${props => props.theme.button}60 0%, ${props => props.theme.button}90 100%);
    flex-shrink: 0;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const CommentBubble = styled.div`
    background: linear-gradient(135deg, ${props => props.theme.placeholder}15 0%, ${props => props.theme.placeholder}25 100%);
    padding: 12px 16px;
    border-radius: 12px;
    border-top-left-radius: 4px;
    flex: 1;
    min-width: 0;
    border: 1px solid ${props => props.theme.placeholder}30;
    transition: all 0.2s ease;

    &:hover {
        background: linear-gradient(135deg, ${props => props.theme.placeholder}20 0%, ${props => props.theme.placeholder}30 100%);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    }
`;

export const CommentHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 6px;
    gap: 8px;
    
    strong {
        font-size: 0.92em;
        font-weight: 700;
        color: ${props => props.theme.black};
    }
    
    span {
        font-size: 0.75em;
        font-weight: 500;
        color: ${props => props.theme['gray-500']};
        opacity: 0.8;
    }
`;

export const CommentText = styled.p`
    font-size: 0.9em !important;
    color: ${props => props.theme['gray-700']} !important;
    margin: 0 !important;
    line-height: 1.5 !important;
    padding: 0 !important;
    letter-spacing: 0.01em !important;
    word-wrap: break-word !important;
    overflow-wrap: break-word !important;
    word-break: break-word !important;
    white-space: pre-wrap !important;
    max-width: 100% !important;
`;

export const DeleteCommentButton = styled.button`
    background: ${props => props.theme['red-500']}15;
    border: none;
    cursor: pointer;
    padding: 6px;
    color: ${props => props.theme['red-500'] || '#e74c3c'};
    border-radius: 6px;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    opacity: 0.7;
    flex-shrink: 0;

    &:hover {
        opacity: 1;
        background: ${props => props.theme['red-500']}25;
        transform: scale(1.1);
    }

    &:active {
        transform: scale(0.95);
    }

    svg {
        width: 16px;
        height: 16px;
    }
`;