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
        name: 'API de Análise de Dados',
            description: 'Um backend em Python para análise.',
            technologies: ['Python', 'Django'],
            status: 'finalizado',
            date: '01/08/2025'
    },
    {
        name: 'API de Análise de Dados',
            description: 'Um backend em Python para análise.',
            technologies: ['Python', 'Django'],
            status: 'finalizado',
            date: '01/08/2025'
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
            
            <Header onCreateClick={() => setIsCreateModalOpen(true)}/>
            <Sidebar />

            <S.ContentWrapper>
                <S.FeedContainer>
                    <S.PostList>
                        {mockPosts.map(post => (
                            <Postcard post={post} showMenu={false}/>
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

