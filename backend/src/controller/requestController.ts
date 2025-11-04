import { z } from 'zod';

const userSchema = z.object({
  nomeCompleto: z.string().min(3, "Nome muito curto"),
  username: z.string().min(4, "Username muito curto"),
  email: z.string().email("Formato de e-mail inválido"),
  telefone: z.string().optional(), // Telefone é opcional
  dataNascimento: z.string() // Idealmente, validar como data
});


export interface userData {
    nomeCompleto: string;
    username: string;
    email: string;
    telefone: string;
    dataNascimento: string;
}

class requestController {

    async create(data: userData) { 
        try{
            
            const validation = userSchema.parse(data);
            
            console.log('Dados recebidos no controller:', data);
            // AQUI virá a lógica para salvar no banco de dados
            // Ex: await knex('usuarios').insert(data);

        } catch(error){

            if (error instanceof z.ZodError) {
                // return response.status(400).json({ 
                //     message: "Erro de validação",
                //     errors: error.flatten().fieldErrors 
                // });
                console.log("Erro de validação");
            }


            console.log("Controller error:" + error);
        }
    }
}

export default new requestController();