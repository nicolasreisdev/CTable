export interface Keywords {
  id: number;
  name: string;
}

export async function GetKeywords(): Promise<string[]> {
  const response = await fetch('http://localhost:3000/api/keywords', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      // 'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
  });

  if (!response.ok) {
    throw new Error('Erro ao buscar tags');
  }

  const data = await response.json();

  // IMPORTANTE: O componente TagInput do seu código original usa um array de strings.
  // Se sua API retorna objetos (ex: [{id: 1, name: "React"}]), faça um map:
  //return data.map((tech: any) => tech.name); 
  
  // Se a API já retorna direto ["React", "Java"], basta retornar:
  return data;
}