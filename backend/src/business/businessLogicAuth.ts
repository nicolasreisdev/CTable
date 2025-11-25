
import { UserData, LoginData } from "../models/User";
import { userValidate } from "../utils/validationUser";
import knex from '../data/index'; 
import bcrypt from 'bcryptjs';



class BusinessLogicAuth{

    async newUser(data: UserData){

        userValidate(data);

        const existingUser = await knex('User')
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


        await knex('User').insert({
            fullName: nomeCompleto,
            username,
            email,
            phone: telefone,
            birthDate: dataNascimento,
            passwordHash: senhaHash
        });

        const user = await knex('User')
                    .where('username', data.username)
                    .first();

        const { passwordHash, ...userData} = user;

        return userData;

    }

    async enterUser(data: LoginData){
        try{
            const user = await knex('User')
                    .where('username', data.username)
                    .first();
            
            if(!user){
                throw new Error('Usuário ou senha incorretos.');
            }

            const isPasswordValid = await bcrypt.compare(
                data.senha,     
                user.passwordHash  
            );

            if (!isPasswordValid) {
                throw new Error('Usuário ou senha incorretos.');
            }

            const { passwordHash, ...userData } = user;
            
            return userData;

        }catch(error){

            throw error;
            
        }
    }

}


export default new BusinessLogicAuth();