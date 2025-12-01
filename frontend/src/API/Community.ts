import api from './api';
import { isAxiosError } from 'axios';

export interface CommunityProps {
    communityID: string;
    name: string;
    description: string;
    technologies: string[];
    createdAt: Date;
    updatedAt: Date;
    memberCount?: number; 
    isMember?: boolean;
    isAdmin?: boolean;
}

const getAuthHeader = () => {
  return {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  };
};

export async function NewCommunity(data: CommunityProps) { 

    try{
      console.log("Enviando dados da comunidade:", data);
      const response = await api.post('/api/newcommunity', data, getAuthHeader());
      return response.data
    }catch(error){
      if (isAxiosError(error) && error.response) {
          throw new Error(error.response.data.message);
      }
      throw new Error("Erro ao criar comunidade.");
    }
}

export async function GetAllCommunities(): Promise<CommunityProps[]> {
  try{
  const response = await api.get<CommunityProps[]>('/api/user/communities', getAuthHeader());
  return response.data
  }catch(error){
    console.error("Erro ao obter comunidades:", error);
    throw new Error('Erro ao obter comunidades');
  }
} 

export async function GetCommunityById(communityId: string) {
  try{
    const response = await api.get(`/api/communities/data/${communityId}`, getAuthHeader());

    return await response.data;
  }catch(error){
    if (isAxiosError(error) && error.response?.status === 404) {
          throw new Error('Comunidade não encontrada');
      }
    throw new Error('Erro ao carregar a comunidade');
  }
}

export async function JoinCommunity(communityId: string) {
  try{
    const response = await api.post(`/api/communities/${communityId}/join`, {}, getAuthHeader());

    return await response.data;
  }catch(error){
    if (isAxiosError(error) && error.response) {
          throw new Error(error.response.data.message);
      }
    throw new Error('Erro ao entrar na comunidade');
  }
}

export async function DeleteCommunity(communityId: string) {
  try{
    const response = await api.delete(`/api/communities/deletecommunity/${communityId}`, getAuthHeader());
    return response.data
  }catch(error){
    if (isAxiosError(error) && error.response) {
          throw new Error(error.response.data.message);
      }
    throw new Error("Erro ao excluir comunidade.");
  }
}

export async function UpdateCommunity(communityId: string, data: CommunityProps) {
  try{
    const response = await api.put(`/api/communities/updatecommunity/${communityId}`,
      data,
      getAuthHeader()
    );

    return response.data;
  }catch(error){
    if (isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message);
      }
    throw new Error("Erro ao atualizar comunidade.");
  }
}

export async function LeaveCommunity(communityId: string) {
  try{
    const response = await api.delete(`/api/user/leavecommunity/${communityId}`, getAuthHeader());

    return await response.data;
  }catch(error){
    if (isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message);
      }
    throw new Error("Erro ao sair da comunidade.");
  }
}