import api from './api';
import { isAxiosError } from 'axios';

export interface ProjectProps {
  id?: string;
  title: string;
  description: string;
  technologies: string[]; 
  status: string;
  startDate: Date;
  authorUsername?: string; 
  authorName?: string;
  creatorID?: number;
}

export function parseDate(dataString: string): Date {
  const [dia, mes, ano] = dataString.split('/');

  return new Date(Number(ano), Number(mes) - 1, Number(dia));
}

const getAuthHeader = () => {
  return {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  };
};

export async function NewProject(data: ProjectProps) {
  try{
    const response = await api.post('/api/user/newproject', data, getAuthHeader());

    return response.data;
  }catch(error){
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Erro ao criar projeto.");
  }
}

export async function UpdateProject(projectId: string, data: ProjectProps) {
  try{
    const response = await api.put(`/api/user/updateproject/${projectId}`, 
      data, 
      getAuthHeader()
    );
    return response.data;
  }catch(error){
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Erro ao atualizar projeto.");
  }

}

export async function GetFeedProjects(): Promise<ProjectProps[]> {

  try{
    const response = await api.get('/api/user/home', getAuthHeader());

    console.log("Dados do feed de projetos:", response.data);

    return response.data.feed;
  }catch(error){
    console.error("Erro ao buscar feed:", error);
    throw new Error("Erro ao carregar o feed de projetos.");
  }
}

export async function DeleteProject(projectId: string) {
  try{
    await api.delete(`/api/user/deleteproject/${projectId}`, getAuthHeader());
  }
  catch(error){
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Erro ao excluir projeto.");
  }
}

export async function GetUserProjects(): Promise<ProjectProps[]> {
  try{
    const response = await api.get('/api/user/projects', getAuthHeader());
    
    console.log("Dados dos projetos do usuário:", response.data.projects);

    return response.data.projects;
  }catch(error){
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Erro ao buscar projetos do usuário.");
  }
}

export async function GetProjectById(projectId: string): Promise<ProjectProps> {
  try{
    const response = await api.get(`/api/projects/${projectId}`, getAuthHeader());

    return await response.data;
  }catch(error){
    console.error("Erro ao buscar projeto:", error);
    throw new Error('Erro ao carregar projeto');
  }
}