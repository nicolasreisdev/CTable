
import knex from '../data/index';
import { ProjectData } from '../models/Project'; 

class businessLogicProject{

    async newProject(data: ProjectData, creatorID: number){

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

    async updateProject(projectId: string, projectData: Partial<any>, userId: number) {
        
        return knex.transaction(async (trx) => {
            
            // Busca projeto e valida autoria
            const existingProject = await trx('Projects') 
                .where({ projectID: projectId })
                .first();

            if (!existingProject) {
                throw new Error("Projeto não encontrado.");
            }

            if (existingProject.creatorID !== userId) {
                throw new Error("Você não tem permissão para editar este projeto.");
            }

            // Prepara campos da tabela PRINCIPAL (Projects)
            const fieldsToUpdate: any = {};

            if (projectData.title !== undefined) fieldsToUpdate.title = projectData.title;
            if (projectData.description !== undefined) fieldsToUpdate.description = projectData.description;
            if (projectData.status !== undefined) fieldsToUpdate.status = projectData.status;
            if (projectData.startDate !== undefined) fieldsToUpdate.startDate = projectData.startDate;

            // Atualiza o 'updatedAt' se houver mudanças nos campos principais
            if (Object.keys(fieldsToUpdate).length > 0) {
                fieldsToUpdate.updatedAt = new Date();
                
                await trx('Projects')
                    .where({ projectID: projectId })
                    .update(fieldsToUpdate);
            }

            // Atualiza a tabela de relacionamento (ProjectsKeywords)
            if (projectData.technologies !== undefined) {
                
                // Remove TODAS as associações antigas desse projeto
                await trx('ProjectsKeywords')
                    .where({ projectID: projectId })
                    .del();

                // Se a nova lista não estiver vazia, insere as novas
                if (Array.isArray(projectData.technologies) && projectData.technologies.length > 0) {
                    
                    // Busca os IDs das tags (Keywords) baseadas no nome (string) enviado pelo front
                    const keywordIDs = await trx('Keywords')
                        .whereIn('tag', projectData.technologies)
                        .select('keywordID');

                    // Prepara o array de inserção
                    const linksToInsert = keywordIDs.map((k: any) => ({
                        projectID: projectId,
                        keywordID: k.keywordID
                    }));

                    // Insere
                    if (linksToInsert.length > 0) {
                        await trx('ProjectsKeywords').insert(linksToInsert);
                    }
                }
            }

            // Retorna o projeto atualizado
            return await trx('Projects').where({ projectID: projectId }).first();
        });
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