import businessLogicUser  from '../business/businessLogicAuth'
import businessLogicProject from '../business/businessLogicProject';
import {userData, loginData } from '../models/User'
import { projectData } from '../models/Project';
import jwt from 'jsonwebtoken';
import { authConfig } from '../config/auth'
import knex from '../data';

class requestController {

    async createUser(data: userData) { 
        try{

            const userData = await businessLogicUser.newUser(data);

            const payload = { id: userData.id, username: userData.username };

            const token = jwt.sign(
                payload,        
                authConfig.secret,   
                { expiresIn: authConfig.expiresIn } 
            );

            return { user: userData, token: token };

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
            console.log(data);
            const newProject = await businessLogicProject.newProject(data, creatorID);
            
            return newProject;

        }catch(error){

            throw new Error("Erro nos dados do projeto.");

        }
    }

    async getKeywords(){
        try{

            const keywords = await knex('Keywords').select('tag');

            const tags = keywords.map(kw => kw.tag);
            
            return tags;

        }catch(error){
            console.error("Erro ao buscar keywords:", error);
            throw new Error("Não foi possível buscar as keywords.");
        }
    }

    async getUserProjects(creatorID: number){
        try{

            const projects = await businessLogicProject.userProjects(creatorID);

            return projects;

        }catch(error){
            throw error;
        }
    }

    async updateProject(projectId: string, data: projectData, userId: number){
        try{

            const updatedProject = await businessLogicProject.updateProject(projectId, data, userId);

            return updatedProject;

        }catch(error){
            throw error;
        }
    }
}

export default new requestController();