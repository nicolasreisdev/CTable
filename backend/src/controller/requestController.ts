import businessLogicUser  from '../business/businessLogicAuth'
import businessLogicProject from '../business/businessLogicProject';
import {UserData, LoginData } from '../models/User'
import { ProjectData } from '../models/Project';
import jwt from 'jsonwebtoken';
import { authConfig } from '../config/auth'
import knex from '../data';
import { CommunityData } from '../models/Community';
import businessLogicCommunity from '../business/businessLogicCommunity';

class RequestController {

    async createUser(data: UserData) { 
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

    async enterUser(data: LoginData){
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

    async createProject(data: ProjectData, creatorID: number){
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
            throw new Error("Erro ao buscar os projetos do usuário.");
        }
    }

    async updateProject(projectId: string, data: ProjectData, userId: number){
        try{

            const updatedProject = await businessLogicProject.updateProject(projectId, data, userId);

            return updatedProject;

        }catch(error){
            throw new Error("Erro ao atualizar o projeto.");
        }
    }

    async newCommunity(data: CommunityData, creatorID: number){
        try{

            const newCommunity = await businessLogicCommunity.newCommunity(data, creatorID);
            return newCommunity;

        }catch(error){
            throw error;
        }
    }

    async getAllCommunities(userID: number) {
        try {
            const communities = await businessLogicCommunity.getAllCommunities(userID);
            return communities;
        } catch (error) {
            console.error("Erro ao buscar comunidades:", error);
            throw new Error("Erro ao carregar as comunidades.");
        }
    }

    async newMemberCommunity(userID: number, communityID: string){
        try{

            const result = await businessLogicCommunity.newMemberCommunity(userID, communityID);
            return result;

        }catch(error){
            throw error;
        }
    }

    async removeProject(userID: number, projectID: string){
        try{

            businessLogicProject.removeProject(userID, projectID);

        }catch(error){
            throw error;
        }
    }
}

export default new RequestController();