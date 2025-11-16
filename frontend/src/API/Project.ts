export interface ProjectProps {
  name: string;
  description: string;
  technologies: string[]; 
  status: string;
  date: string;
}

export async function NewProject(data: ProjectProps) {
    
  const response = await fetch('http://localhost:3000/api/newproject', {
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
  }


}