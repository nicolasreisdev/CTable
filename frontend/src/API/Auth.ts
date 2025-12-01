import api from './api'; // Importa a instância que criamos no Passo 2
import { isAxiosError } from 'axios';

export interface LoginProps {
  username: string;
  senha: string;
}

export interface RegisterProps {
  nomeCompleto: string;
  username: string;
  email: string;
  senha: string;
  telefone: string;
  dataNascimento: string; 
}

export async function Login(data: LoginProps) {
  try{
  
    const response = await api.post('/api/login', data);

    const { user, token } = response.data;
    console.log("Dados do usuário logado:", user);
    return { user, token };

  }catch(error){
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Erro ao conectar com o servidor.");
  }
  
}


export async function Register(data: RegisterProps) {
 try {

    await api.post('/api/register', data);

  } catch (error) {

    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Erro ao realizar cadastro.");

  }
}

export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}

export function getCurrentUser() {
  const userString = localStorage.getItem('user');
  if (!userString) return null;

  try{

    return JSON.parse(userString);

  }catch {

    return null;
    
  }
}