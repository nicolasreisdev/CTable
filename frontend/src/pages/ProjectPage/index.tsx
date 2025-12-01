import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../../components/layout/Sidebar';
import * as S from './styles';
import { GetProjectById } from '../../API/Project';
import type { ProjectProps } from '../../API/Project';
import { FiCalendar, FiUser } from 'react-icons/fi';

export default function ProjectPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const [project, setProject] = useState<ProjectProps | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
        if (!projectId) return;
        try {
            setLoading(true);
            const data = await GetProjectById(projectId);
            setProject(data);
        } catch (error) {
            console.error("Erro ao carregar projeto:", error);
        } finally {
            setLoading(false);
        }
    }
    loadData();
  }, [projectId]);

  if (loading) return <div>Carregando...</div>;
  if (!project) return <div>Projeto não encontrado</div>;

  // Formata data
  const startDate = new Date(project.startDate).toLocaleDateString('pt-BR');

  return (
    <S.PageWrapper>
      <Sidebar />
      
      <S.MainContent>
        <S.Banner />
        
        <S.HeaderContainer>
          {/* Ícone com a inicial do projeto */}
          <S.ProjectIcon>
            {project.title.charAt(0).toUpperCase()}
          </S.ProjectIcon>
          
          <S.HeaderInfo>
            <h1>{project.title}</h1>
            <span>
                <FiUser style={{ marginRight: 5, verticalAlign: 'middle' }}/>
                Criado por <strong>{project.authorUsername || project.authorName}</strong>
            </span>
          </S.HeaderInfo>
        </S.HeaderContainer>

        <S.ContentGrid>
          
          {/* Coluna Principal: Descrição */}
          <S.MainColumn>
            <h2>Sobre o Projeto</h2>
            <S.DescriptionBox>
                {project.description}
            </S.DescriptionBox>

          </S.MainColumn>

          <S.InfoSidebar>
            <h3>Status</h3>
            <S.StatusBadge status={project.status}>
                {project.status.replace('-', ' ')}
            </S.StatusBadge>

            <h3>Início</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#555' }}>
                <FiCalendar />
                <span>{startDate}</span>
            </div>

            <h3>Tecnologias</h3>
            <S.KeywordsContainer>
              {project.technologies?.map((tech) => (
                <S.KeywordTag key={tech}>
                  {tech}
                </S.KeywordTag>
              ))}
            </S.KeywordsContainer>
          </S.InfoSidebar>

        </S.ContentGrid>
      </S.MainContent>
    </S.PageWrapper>
  );
}