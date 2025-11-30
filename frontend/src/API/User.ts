export interface UserProfileData {
  nomeCompleto: string;
  username: string;
  email: string;
  telefone: string;
  dataNascimento: string; 
}

export async function UpdateProfile(data: UserProfileData) {
  const response = await fetch('http://localhost:3000/api/user/editprofile', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Erro ao atualizar perfil.");
  }

  // Retorna o usuário atualizado
  return await response.json();
}

export async function DeleteProfile() {
  const response = await fetch('http://localhost:3000/api/user/deleteprofile', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Erro ao excluir perfil.");
  }
  
  return await response.json();
}