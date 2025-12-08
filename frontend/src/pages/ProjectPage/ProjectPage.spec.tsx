import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ProjectPage from './index';
import { BrowserRouter } from 'react-router-dom';
import * as ProjectAPI from '../../API/Project';

const mockParams = { projectId: 'proj-123' };

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useParams: () => mockParams,
  };
});

vi.mock('../../API/Project', () => ({
  GetProjectById: vi.fn(),
}));

vi.mock('../../components/layout/Sidebar', () => ({ default: () => <div /> }));

interface StyleProps {
  children?: React.ReactNode;
}

vi.mock('./styles', () => ({
  PageWrapper: ({ children }: StyleProps) => <div>{children}</div>,
  MainContent: ({ children }: StyleProps) => <div>{children}</div>,
  Banner: () => <div />,
  HeaderContainer: ({ children }: StyleProps) => <div>{children}</div>,
  ProjectIcon: ({ children }: StyleProps) => <div>{children}</div>,
  HeaderInfo: ({ children }: StyleProps) => <div>{children}</div>,
  ContentGrid: ({ children }: StyleProps) => <div>{children}</div>,
  MainColumn: ({ children }: StyleProps) => <div>{children}</div>,
  DescriptionBox: ({ children }: StyleProps) => <div>{children}</div>,
  InfoSidebar: ({ children }: StyleProps) => <div>{children}</div>,
  KeywordsContainer: ({ children }: StyleProps) => <div>{children}</div>,
  KeywordTag: ({ children }: StyleProps) => <span>{children}</span>,
  StatusBadge: ({ children }: StyleProps) => <span>{children}</span>,
}));

describe('Página ProjectPage', () => {
  const mockProject = {
    id: 'proj-123',
    title: 'Super App',
    description: 'Uma descrição detalhada',
    startDate: '2025-01-01T00:00:00.000Z',
    status: 'em-andamento',
    technologies: ['React', 'Node'],
    authorUsername: 'devMaster'
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve carregar e exibir os detalhes do projeto', async () => {
    vi.spyOn(ProjectAPI, 'GetProjectById').mockResolvedValue(mockProject as unknown as ProjectAPI.ProjectProps);

    render(
      <BrowserRouter>
        <ProjectPage />
      </BrowserRouter>
    );

    await waitFor(() => {
        expect(screen.getByText('Super App')).toBeInTheDocument();
        expect(screen.getByText('Uma descrição detalhada')).toBeInTheDocument();
        expect(screen.getByText(/devMaster/)).toBeInTheDocument();
        expect(screen.getByText('em andamento')).toBeInTheDocument();
        expect(screen.getByText('React')).toBeInTheDocument();
        expect(screen.getByText('Node')).toBeInTheDocument();
    });
  });

  it('deve exibir mensagem se projeto não for encontrado', async () => {
    vi.spyOn(ProjectAPI, 'GetProjectById').mockResolvedValue(null as unknown as ProjectAPI.ProjectProps);

    render(
      <BrowserRouter>
        <ProjectPage />
      </BrowserRouter>
    );

    await waitFor(() => {
        expect(screen.getByText('Projeto não encontrado')).toBeInTheDocument();
    });
  });
});