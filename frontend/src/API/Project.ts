export interface ProjectProps {
  name: string;
  description: string;
  technologies: string[]; 
  status: string;
  date: string;
}

// Tipagem do projeto retornado pela API 
export interface FetchedProjectProps extends ProjectProps {
  id: string; 
  author: {
    id: string;
    username: string;
  };
  community: {
    name: string;
    avatarUrl?: string;
  };
}

export async function NewProject(data: ProjectProps) {
    
  const response = await fetch('http://localhost:3000/api/newproject', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();  
    throw new Error(errorData.message);  
  }
}

export async function UpdateProject(projectId: string, data: ProjectProps) {
    
  /* const response = await fetch(`http://localhost:3000/api/editproject/${projectId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();  
    throw new Error(errorData.message);  
  } */
}

export async function getFeedProjects(): Promise<ProjectProps[]> {
  // Em um app real, você faria um fetch
  // const response = await fetch('http://localhost:3000/api/projects', ...);
  // const data = await response.json();
  // return data;

  // Por agora, vamos simular a resposta da API:
  return [
    {
      name: 'Projeto CTable (React)',
      description: 'Post da "ceci" (usuário logado)',
      technologies: ['React', 'TS'], status: 'em-andamento', date: '10/11/2025'
    },
    {
      name: 'Projeto de Outra Pessoa',
      description: 'Post de outro usuário...',
      technologies: ['Python'], status: 'finalizado', date: '01/10/2025'
    }
  ];
}