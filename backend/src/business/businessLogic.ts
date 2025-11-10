
import { userData, loginData } from "../controller/requestController";
import { userValidate } from "../utils/validationUser";
import knex from '../data/index'; 
import bcrypt from 'bcryptjs';



class businessLogic{

    async newUser(data: userData){
        userValidate(data);

        const existingUser = await knex('usuarios')
                .where('username', data.username)
                .orWhere('email', data.email)
                .first();

        if (existingUser) {
            if (existingUser.username === data.username) {
                throw new Error('Este username já está em uso.');
            }
            if (existingUser.email === data.email) {
                throw new Error('Este e-mail já está em uso.');
            }
        }

        const salt = await bcrypt.genSalt(10);

        const senhaHash = await bcrypt.hash(data.senha, salt); 

        const { nomeCompleto, username, email, telefone, dataNascimento } = data;

        await knex('usuarios').insert({
            nomeCompleto,
            username,
            email,
            telefone,
            dataNascimento,
            senhaHash
        });
    }

    async enterUser(data: loginData){
        try{
            const user = await knex('usuarios')
                    .where('username', data.username)
                    .first();
            
            if(!user){
                throw new Error('Usuário ou senha incorretos.');
            }

            const isPasswordValid = await bcrypt.compare(
                data.senha,     
                user.senhaHash  
            );

            if (!isPasswordValid) {
                throw new Error('Usuário ou senha incorretos.');
            }

            const { senhaHash, ...userData } = user;
            
            return userData;

        }catch(error){
            console.log("Login error in businessLogic:", error);
            throw error;
        }
    }
}


export default new businessLogic();