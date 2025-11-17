
import knex from '../data/index';
import { projectData } from '../models/Project'; 

class businessLogicProject{

    async newProject(data: projectData, creatorID: number){

        return knex.transaction(async (trx) => {
            
            const projectToInsert = {
                title: data.title,
                description: data.description,
                status: data.status,
                startDate: data.startDate,
                creatorID: creatorID 
            };

            const [newProject] = await trx('Projects')
                                        .insert(projectToInsert)
                                        .returning('*'); // retorna o projeto que foi criado com todos seus campos

            if (data.technologies && data.technologies.length > 0) {
                
                const keywordIDs = await trx('Keywords')
                                        .whereIn('tag', data.technologies)
                                        .select('keywordID'); // retrona o ID das tags selecionadas

                const keywordsToInsert = keywordIDs.map(keyword => {
                    return {
                        projectID: newProject.projectID, // ID do projeto 
                        keywordID: keyword.keywordID // ID da tag
                    };
                });

                if (keywordsToInsert.length > 0) {
                    await trx('ProjectsKeywords').insert(keywordsToInsert); 
                }
            }
            
            return newProject;
        });
    }

    updateProject(){
    }

    async userProjects(creatorID: number){

        const projects = await knex('Projects')
                        .where('creatorID', creatorID);
        
        return projects;
    }

    removeProject(){
    }
    
}

export default new businessLogicProject();