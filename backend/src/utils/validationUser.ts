import { z } from 'zod';
import { UserData } from '../models/User';

const userSchema = z.object({
  nomeCompleto: z.string().min(3, "Nome muito curto"),
  username: z.string().min(4, "Username muito curto"),
  email: z.string().email("Formato de e-mail inválido"),
  telefone: z.string().optional(), 
  dataNascimento: z.string() 
});


export function userValidate(data: UserData){
    userSchema.parse(data);
}