import api from './api'

export interface Keywords {
  id: number;
  name: string;
}

export async function GetKeywords(): Promise<string[]> {
  try{
    const response = await api.get<string[]>('/api/keywords')

    return response.data;
  }catch(error){
    console.error("Erro ao buscar keywords:", error);
    throw new Error('Erro ao buscar tags');
  }
}