export interface CommunityProps {
    communityID: string;
    name: string;
    description: string;
    technologies: string[];
    createdAt: Date;
    updatedAt: Date;
}

export async function NewCommunity(data: CommunityProps) { 
    console.log("Enviando dados da comunidade:", data);
    const response = await fetch('http://localhost:3000/api/newcommunity', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    console.error("Erro ao criar comunidade:", response.statusText);
    const errorData = await response.json();  
    throw new Error(errorData.message);  
  } 
}

export async function GetAllCommunities(): Promise<CommunityProps[]> {
  const response = await fetch('http://localhost:3000/api/user/communities', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  });

  if (!response.ok) {
    console.error("Erro ao obter comunidades:", response.statusText);
    throw new Error('Erro ao obter comunidades');
  }

  const communities: CommunityProps[] = await response.json();
  return communities;
} 

export async function GetCommunityById(communityId: string) {
  const response = await fetch(`http://localhost:3000/api/communities/${communityId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  });

  if (!response.ok) {
    if (response.status === 404) throw new Error('Comunidade não encontrada');
    throw new Error('Erro ao carregar a comunidade');
  }

  return await response.json();
}