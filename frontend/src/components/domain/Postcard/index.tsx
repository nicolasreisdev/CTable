import React from 'react';
import * as S from './styles';

// Tipagem para o post
interface Post {
    id: string;
    community: {
        name: string;
        avatarUrl: string; // URL para o avatar da comunidade
    };
    author: {
        name: string;
    };
    content: string;
}

interface PostCardProps {
    post: Post;
}

// Avatar de mock
const mockAvatar = "https://i.pravatar.cc/32";

export default function Postcard({ post }: PostCardProps) {
    return (
        <S.PostCardWrapper>
            <S.PostHeader>
                <img src={post.community.avatarUrl || mockAvatar} alt={post.community.name} />
                <span>{post.community.name}</span>
                <small>• {post.author.name}</small>
            </S.PostHeader>
            <S.PostContent>
                <p>{post.content}</p>
            </S.PostContent>
        </S.PostCardWrapper>
    );
}

