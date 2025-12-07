import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../../components/common/Modal';
import Postcard from '../../components/domain/Postcard';
import Header from '../../components/layout/Header';
import Sidebar from '../../components/layout/Sidebar';
import * as S from './styles';
import * as ModalS from '../../components/common/Modal/styles';
import { GetFeedProjects } from '../../API/Project';
import type { ProjectProps } from '../../API/Project';
import Toast from '../../components/common/Toast'; 
import type { NotificationState } from '../../components/common/Toast';

export default function Feed() {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const [posts, setPosts] = useState<ProjectProps[]>([]);
    const [notification, setNotification] = useState<NotificationState | null>(null);

    useEffect(() => {
        async function loadFeed() {
            setIsLoading(true);
            try {
                const feedData = await GetFeedProjects();
                setPosts(feedData || []);
            } catch (error) {
                console.error("Erro ao carregar feed:", error);
                if (error instanceof Error) {
                    setNotification({ message: "Não foi possível carregar o feed.", type: 'error' });
                }
            } finally {
                setIsLoading(false);
            }
        }
        loadFeed();
    }, []);

    const handleCreateProject = () => {
        setIsCreateModalOpen(false);
        navigate('/createProject');
    };

    const handleCreateCommunity = () => {
        setIsCreateModalOpen(false);
        navigate('/createCommunity');
    };

    return (
        <S.PageWrapper>
            {notification && (
                <Toast 
                    message={notification.message} 
                    type={notification.type} 
                    onClose={() => setNotification(null)} 
                />
            )}
            
            <Header onCreateClick={() => setIsCreateModalOpen(true)}/>
            <Sidebar />

            <S.ContentWrapper>
                <S.FeedContainer>
                    <S.PostList>
                        {isLoading ? (
                            <S.LoadingContainer>
                                <div className="spinner"></div>
                                <p>Carregando feed...</p>
                            </S.LoadingContainer>
                        ) : posts.length > 0 ? (
                            posts.map((post, index) => (
                                <Postcard 
                                    key={(post as unknown as ProjectProps).id || (post as any).projectID || index} 
                                    post={post} 
                                    showMenu={false} 
                                />
                            ))
                        ) : (
                            <S.EmptyFeedMessage>
                                <svg 
                                    viewBox="0 0 24 24" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    strokeWidth="2"
                                    strokeLinecap="round" 
                                    strokeLinejoin="round"
                                >
                                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                                    <line x1="9" y1="9" x2="15" y2="15"/>
                                    <line x1="15" y1="9" x2="9" y2="15"/>
                                </svg>
                                <h3>Nenhum post encontrado</h3>
                                <p style={{ color: '#ccc', textAlign: 'center', marginTop: '20px' }}>
                                    Nenhum post encontrado. Entre em comunidades para ver atualizações!
                                </p>
                            </S.EmptyFeedMessage>
                        )}
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