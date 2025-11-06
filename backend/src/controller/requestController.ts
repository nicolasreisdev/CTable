import { userValidate } from "../utils/validationUser";


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
            
            console.log('Dados recebidos no controller:', data);

            userValidate(data);

            // AQUI virá a lógica para salvar no banco de dados
            // Ex: await knex('usuarios').insert(data);

        } catch(error){

            console.log("Controller error:" + error);
            throw error;
        }
    }
}

export default new requestController();