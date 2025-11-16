// frontend/src/pages/FeedPage/FeedPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../../components/common/Modal';
import Postcard from '../../components/domain/Postcard';
import Header from '../../components/layout/Header';
import Sidebar from '../../components/layout/Sidebar';
import * as S from './styles';
import * as ModalS from '../../components/common/Modal/styles';

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
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleCreateProject = () => {
        setIsCreateModalOpen(false);
        navigate('/createProject'); // Navega para a página de projeto
    };

    const handleCreateCommunity = () => {
        setIsCreateModalOpen(false);
        navigate('/createCommunity'); // Navega para a página de comunidade
    };
    return (
        <S.PageWrapper>
            
            {/* Componentes de Layout renderizados aqui */}
            <Header onCreateClick={() => setIsCreateModalOpen(true)}/>
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

            <Modal 
                isOpen={isCreateModalOpen} 
                onClose={() => setIsCreateModalOpen(false)}
                title="O que você deseja criar?"
            >
                <ModalS.ModalActions>
                <ModalS.ChoiceButton onClick={handleCreateProject}>
                    Criar Projeto
                </ModalS.ChoiceButton>
                <ModalS.ChoiceButton onClick={handleCreateCommunity}>
                    Criar Comunidade
                </ModalS.ChoiceButton>
                </ModalS.ModalActions>
            </Modal>

        </S.PageWrapper>
    );
}

