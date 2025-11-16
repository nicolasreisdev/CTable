import businessLogicUser  from '../business/businessLogicAuth'
import businessLogicProject from '../business/businessLogicProject';
import {userData, loginData } from '../models/User'
import { projectData } from '../models/Project';
import jwt from 'jsonwebtoken';
import { authConfig } from '../config/auth'

class requestController {

    async createUser(data: userData) { 
        try{

            await businessLogicUser.newUser(data);

        } catch(error){

            throw error;
            
        }
    }

    async enterUser(data: loginData){
        try{

            const userData = await businessLogicUser.enterUser(data);

            const payload = { id: userData.id, username: userData.username };
            
            const token = jwt.sign(
                payload,        
                authConfig.secret,   
                { expiresIn: authConfig.expiresIn } 
            );

            return { user: userData, token: token };

        }catch(error){
            throw error;
        }
    }

    async createProject(data: projectData, creatorID: number){
        try{

            const newProject = await businessLogicProject.newProject(data, creatorID);
            
            return newProject;

        }catch(error){

            throw new Error("Erro nos dados do projeto.");

        }
    }
}

export default new requestController();