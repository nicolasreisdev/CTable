export interface ProjectProps {
  id?: string;
  title: string;
  description: string;
  technologies: string[]; 
  status: string;
  startDate: Date;
}

export function parseDate(dataString: string): Date {
  // Divide a string "20/11/2025" em partes
  const [dia, mes, ano] = dataString.split('/');

  // Cria a data: new Date(ano, mês - 1, dia)
  return new Date(Number(ano), Number(mes) - 1, Number(dia));
}

export async function NewProject(data: ProjectProps) {
    
  const response = await fetch('http://localhost:3000/api/user/newproject', {
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
    
  const response = await fetch(`http://localhost:3000/api/user/updateproject/${projectId}`, {
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
  } 
}

export async function GetFeedProjects(): Promise<ProjectProps[]> {
  const token = localStorage.getItem('token');

  const response = await fetch('http://localhost:3000/api/user/home', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, 
    },
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }

  const data = await response.json();
  console.log("Dados do feed de projetos:", data);

  return data.feed;
}

export async function DeleteProject(projectId: string) {
    const response = await fetch(`http://localhost:3000/api/user/deleteproject/${projectId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Erro ao excluir projeto.");
  } 
}

export async function GetUserProjects(): Promise<ProjectProps[]> {
  const token = localStorage.getItem('token');

  const response = await fetch('http://localhost:3000/api/user/projects', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, // Adiciona o Token JWT
    },
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }

  const data = await response.json();
  console.log("Dados dos projetos do usuário:", data.projects);

  return data.projects;
}
