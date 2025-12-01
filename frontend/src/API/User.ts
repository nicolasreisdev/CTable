import api from './api';
import { isAxiosError } from 'axios';

export interface UserProfileData {
  nomeCompleto: string;
  username: string;
  email: string;
  telefone: string;
  dataNascimento: string; 
}

export async function UpdateProfile(data: UserProfileData) {
  try{

    const response = await api.put('/api/user/editprofile', data, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    });

    return response.data;

  }catch(error){

    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Erro ao atualizar perfil.");

  }
}

export async function DeleteProfile() {
  try{

    const response = await api.delete('/api/user/deleteprofile', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    });

    
    return response.data;
    
  }catch(error){

    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Erro ao excluir perfil.");

  }
}