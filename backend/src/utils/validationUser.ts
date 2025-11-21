import { z } from 'zod';
import { userData } from '../models/User';

const userSchema = z.object({
  nomeCompleto: z.string().min(3, "Nome muito curto"),
  username: z.string().min(4, "Username muito curto"),
  email: z.string().email("Formato de e-mail inválido"),
  telefone: z.string().optional(), // telefone é opcional
  dataNascimento: z.string() // validar como data
});


export function userValidate(data: userData){
    userSchema.parse(data); // validação dos dados
}