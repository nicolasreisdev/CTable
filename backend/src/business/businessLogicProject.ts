
import knex from '../data/index';
import { Project, projectData } from '../models/Project'



class businessLogicProject{

    async newProject(data: projectData){
        console.log("Lógica de negócios de criação de projeto");
    }

    updateProject(){

    }

    removeProject(){

    }
    
}


export default new businessLogicProject();