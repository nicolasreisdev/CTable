import knex from '../data/index';
import { UserData } from '../models/User';
import bcrypt from 'bcryptjs';



class businessLogicProfile{


    async updateProfile(data: UserData, userID: number){
        
        const fieldsToUpdate: any = {};
        
        if (data.nomeCompleto) fieldsToUpdate.fullName = data.nomeCompleto; // Note a conversão de nome
        if (data.email) fieldsToUpdate.email = data.email;
        if (data.username) fieldsToUpdate.username = data.username;
        if (data.telefone) fieldsToUpdate.phone = data.telefone;
        if (data.dataNascimento) fieldsToUpdate.birthDate = data.dataNascimento;

        if (data.senha) {
            const salt = await bcrypt.genSalt(10);
            fieldsToUpdate.passwordHash = await bcrypt.hash(data.senha, salt);
        }

        if (Object.keys(fieldsToUpdate).length === 0) {
            throw new Error("Nenhum dado para atualizar.");
        }

        fieldsToUpdate.updatedAt = new Date();

        await knex('User')
            .where('id', userID)
            .update(fieldsToUpdate);

        const updatedUser = await knex('User')
            .where('id', userID)
            .select('id', 'fullName', 'username', 'email', 'phone', 'birthDate', 'createdAt')
            .first();

        return updatedUser;
    }

    async removeProfile(userID: number){
        const user = await knex('User').where('id', userID).first();

        if (!user) {
            throw new Error("Usuário não encontrado.");
        }

        await knex('User')
            .where('id', userID)
            .del();
            
        return { message: "Perfil deletado com sucesso." };
    }
    
}


export default new businessLogicProfile();