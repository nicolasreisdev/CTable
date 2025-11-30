export interface CommentProps {
  commentID?: string;
  content: string;
  createdAt?: string;
  authorID?: string;
  projectID?: string;
  username?: string;
  fullName?: string;
}

export async function CreateComment(projectId: string, content: string) {
  const response = await fetch(`http://localhost:3000/api/project/${projectId}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({ content }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Erro ao enviar comentário.");
  }

  return await response.json();
}

export async function GetComments(projectId: string): Promise<CommentProps[]> {
  const response = await fetch(`http://localhost:3000/api/project/${projectId}/comments`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  });

  if (!response.ok) {
    throw new Error("Erro ao carregar comentários.");
  }

  return await response.json();
}