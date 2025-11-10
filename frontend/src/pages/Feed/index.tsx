// frontend/src/pages/FeedPage/FeedPage.tsx
import React from 'react';
import Postcard from '../../components/domain/Postcard';
import Header from '../../components/layout/Header';
import Sidebar from '../../components/layout/Sidebar';
import * as S from './styles';

// --- DADOS MOCKADOS ---
const mockPosts = [
    {
        id: '1',
        community: { name: 'r/Python', avatarUrl: '' },
        author: { name: 'ceci' },
        content: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Etiam eget ligula eu lectus lobortis condimentum. Aliquam nonummy auctor massa. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla at risus. Quisque purus magna, auctor et, sagittis ac, posuere eu, lectus. Nam mattis, felis ut adipiscing.'
    },
    {
        id: '2',
        community: { name: 'r/Python', avatarUrl: '' },
        author: { name: 'ceci' },
        content: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Etiam eget ligula eu lectus lobortis condimentum. Aliquam nonummy auctor massa. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla at risus. Quisque purus magna, auctor et, sagittis ac, posuere eu, lectus. Nam mattis, felis ut adipiscing.'
    }
];
// -----------------------------------------------------------

export default function Feed() {
    return (
        <S.PageWrapper>
            
            {/* Componentes de Layout renderizados aqui */}
            <Header />
            <Sidebar />

            {/* Conteúdo da Página */}
            <S.ContentWrapper>
                <S.FeedContainer>
                    <S.PostList>
                        {mockPosts.map(post => (
                            <Postcard key={post.id} post={post} />
                        ))}
                    </S.PostList>
                </S.FeedContainer>
            </S.ContentWrapper>

        </S.PageWrapper>
    );
}

