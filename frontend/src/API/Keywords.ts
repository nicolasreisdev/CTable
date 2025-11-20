export interface Keywords {
  id: number;
  name: string;
}

export async function GetKeywords(): Promise<string[]> {
  const response = await fetch('http://localhost:3000/api/keywords', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Erro ao buscar tags');
  }

  const data = await response.json();
  return data;
}