import businessLogicUser  from '../business/businessLogicAuth'
import BusinessLogicProject from '../business/businessLogicProject';
import {UserData, LoginData } from '../models/User'
import { ProjectData } from '../models/Project';
import jwt from 'jsonwebtoken';
import { authConfig } from '../config/auth'
import knex from '../data';
import { CommunityData } from '../models/Community';
import BusinessLogicCommunity from '../business/businessLogicCommunity';
import businessLogicProject from '../business/businessLogicProject';
import businessLogicCommunity from '../business/businessLogicCommunity';
import { error } from 'console';
import businessLogicProfile from '../business/businessLogicProfile';

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
            const newProject = await BusinessLogicProject.newProject(data, creatorID);
            
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

            const projects = await BusinessLogicProject.userProjects(creatorID);

            return projects;

        }catch(error){
            throw new Error("Erro ao buscar os projetos do usuário.");
        }
    }

    async updateProject(projectId: string, data: ProjectData, userId: number){
        try{

            const updatedProject = await BusinessLogicProject.updateProject(projectId, data, userId);

            return updatedProject;

        }catch(error){
            throw new Error("Erro ao atualizar o projeto.");
        }
    }

    async removeProject(userID: number, projectID: string){
        try{

            BusinessLogicProject.removeProject(userID, projectID);

        }catch(error){
            throw error;
        }
    }

    async getProjectById(projectId: string) {
        try {
            const project = await businessLogicProject.getProjectById(projectId);
            return project;
        } catch (error) {
            throw error;
        }
    }

    async newCommunity(data: CommunityData, creatorID: number){
        try{

            const newCommunity = await BusinessLogicCommunity.newCommunity(data, creatorID);
            return newCommunity;

        }catch(error){
            throw error;
        }
    }

    async getAllUserCommunities(userID: number) {
        try {
            const communities = await BusinessLogicCommunity.getAllUserCommunities(userID);
            return communities;
        } catch (error) {
            console.error("Erro ao buscar comunidades:", error);
            throw new Error("Erro ao carregar as comunidades.");
        }
    }

    async getUserHome(userID: number){
        try{
            const communities = await businessLogicCommunity.getAllUserCommunities(userID);

            const feed = await businessLogicCommunity.getUserFeed(userID);
    
            return {
                communities: communities,
                feed: feed
            };
            
        }catch(error){
            throw error;
        }
    }
    async getAllCommunities(){
        try{

            const communities = await BusinessLogicCommunity.getAllCommunities();
            
            return communities;

        }catch(error){
            throw error;
        }

    }

    async getCommunityData(communityID: string, userID: number){
        try{    

            const result = await BusinessLogicCommunity.getCommunityData(communityID,userID);

            return result;

        }catch(error){
            throw error;
        }
    }

    async newMemberCommunity(userID: number, communityID: string){
        try{

            const result = await BusinessLogicCommunity.newMemberCommunity(userID, communityID);
            return result;

        }catch(error){
            throw error;
        }
    }

    async leaveMemberCommunity(userID: number, communityID: string){
        try{

           const result = await businessLogicCommunity.leaveMemberCommunity(userID, communityID);

            return result;

        }catch(error){
            throw error;
        }

    }

    async updateCommunity(creatorID: number, communityID: string, data: CommunityData){
        try{

            const updatedCommunity = await BusinessLogicCommunity.updateCommunity(creatorID, communityID, data);

            return updatedCommunity;

        }catch(error){
            throw error;
        }
    }

    async removeCommunity(creatorID: number, communityID: string){
        try{

            await BusinessLogicCommunity.removeCommunity(creatorID, communityID);

        }catch(error){
            throw error;
        }
    }

    async newComment(userID: number, projectID: string, content: string){
        try{

            if (!content || content.trim() === "") {
                throw new Error("O comentário não pode ser vazio.");
            }

            const comment = await businessLogicProject.newComment(userID, projectID, content);

            return comment;

        }catch(error){
            throw error;
        }
    }

    async getProjectComments(projectID: string) {
        try{

            const projectComments = await businessLogicProject.getProjectComments(projectID);

            return projectComments;

        }catch(error){
            throw error;
        }
    }

    async updateProfile(data: UserData, userID: number){
        try{

            const result = await businessLogicProfile.updateProfile(data, userID);

            return result;

        }catch(error){
            throw error;
        }

    }

    async deleteProfile(userID: number){
        try{

            const message = await businessLogicProfile.removeProfile(userID);
            return message;

        }catch(error){
            throw error;
        }

    }

    async deleteComment(userID: number, commentID: string){
        try{

            await businessLogicProject.removeComment(userID, commentID);

        }catch(error){
            throw error;
        }
    }

    async getUserComments(userID: number){
        try{

            const allComments = await businessLogicProject.getUserComments(userID);
            
            return allComments;

        }catch(error){
            throw error;
        }
    }

}

export default new RequestController();