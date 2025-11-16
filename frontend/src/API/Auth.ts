interface LoginProps {
  username: string;
  senha: string;
}

export async function Login(data: LoginProps) {
  const response = await fetch('http://localhost:3000/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }

  const {user, token} = await response.json();
  localStorage.setItem('token', token);
  
}

interface RegisterProps {
  nomeCompleto: string;
  username: string;
  email: string;
  senha: string;
  telefone: string;
  dataNascimento: string; 
}

export async function Register(data: RegisterProps) {
  const response = await fetch('http://localhost:3000/api/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();  
    throw new Error(errorData.message);  
  }
}