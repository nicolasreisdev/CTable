import businessLogic  from '../business/businessLogic'
import jwt from 'jsonwebtoken';

const TOKEN_SECRET = 'seu-segredo-super-secreto-mude-depois';
export interface userData {
    nomeCompleto: string;
    username: string;
    email: string;
    telefone: string;
    dataNascimento: string;
    senha: string;
}

export interface loginData{
    username: string;
    senha: string;
}

class requestController {

    async createUser(data: userData) { 
        try{
            
            console.log('Dados recebidos no controller:', data);

            await businessLogic.newUser(data);

        } catch(error){

            console.log("Controller error:" + error);
            throw error;
        }
    }

    async enterUser(data: loginData){
        try{
            console.log('dados do Login: ', data);

            const userData = await businessLogic.enterUser(data);

            const payload = { id: userData.id, username: userData.username };
            
            const token = jwt.sign(
                payload,        
                TOKEN_SECRET,   
                { expiresIn: '1d' } 
            );

            return { user: userData, token: token };

        }catch(error){
            console.log("Controller error login:" + error)
            throw error;
        }
    }
}

export default new requestController();