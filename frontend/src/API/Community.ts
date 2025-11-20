export interface CommunityProps {
    communityID: string;
    name: string;
    description: string;
    keywords: string[];
    createdAt: Date;
    updatedAt: Date;
}

export async function NewCommunity(data: CommunityProps) { 
  /* const response = await fetch('http://localhost:3000/api/user/newcommunity', {
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
  } */
}