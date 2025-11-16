import businessLogicUser  from '../business/businessLogicAuth'
import businessLogicProject from '../business/businessLogicProject';
import {userData, loginData } from '../models/User'
import { projectData } from '../models/Project';
import jwt from 'jsonwebtoken';

const TOKEN_SECRET = 'seu-segredo-super-secreto-mude-depois';

class requestController {

    async createUser(data: userData) { 
        try{
            
            console.log('Dados recebidos no controller:', data);

            await businessLogicUser.newUser(data);

        } catch(error){

            console.log("Controller error:" + error);
            throw error;
        }
    }

    async enterUser(data: loginData){
        try{
            console.log('dados do Login: ', data);

            const userData = await businessLogicUser.enterUser(data);

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

    async createProject(data: projectData){
        try{

            businessLogicProject.newProject(data);
            
            console.log("Iniciando novo projeto");
        }catch(error){
            console.log("Erro na criação do projeto");
        }
    }
}

export default new requestController();