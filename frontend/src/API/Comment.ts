import api from './api';
import { isAxiosError } from 'axios';
export interface CommentProps {
  projectTitle?: string;
  commentID?: string;
  content: string;
  createdAt?: string;
  authorID?: string;
  projectID?: string;
  username?: string;
  fullName?: string;
}

const getAuthHeader = () => {
  return {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  };
};

export async function CreateComment(projectId: string, content: string) {
  try{

    const response = await api.post(`/api/project/${projectId}/comments`, 
      {content},
      getAuthHeader()
    );

    return response.data;

  }catch(error){

    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Erro ao enviar comentário.");

  }
}

export async function GetComments(projectId: string): Promise<CommentProps[]> {
  try{
  
    const response = await api.get(`/api/project/${projectId}/comments`, getAuthHeader());

    return await response.data;
  }catch(error){
    console.error("Erro ao buscar comentários:", error);
    throw new Error("Erro ao carregar comentários.");
  }


}

export async function GetUserComments(): Promise<CommentProps[]> {
  try{
    const response = await api.get('/api/user/comments', getAuthHeader());

    return response.data;
  }catch(error){
    console.error("Erro ao buscar comentários do usuário:", error);
    throw new Error("Erro ao carregar comentários do usuário.");
  }
}

export async function DeleteComment(commentId: string) {
  try{
  
    const response = await api.delete(`/api/project/${commentId}/deletecomment`, getAuthHeader());

    return response.data;
  }catch(error){
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Erro ao excluir comentário.");
  }
}