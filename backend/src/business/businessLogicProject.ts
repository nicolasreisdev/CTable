
import knex from '../data/index';
import { ProjectData } from '../models/Project'; 

class BusinessLogicProject{

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
                                        .returning('*'); 

            if (data.technologies && data.technologies.length > 0) {
                
                const keywordIDs = await trx('Keywords')
                                        .whereIn('tag', data.technologies)
                                        .select('keywordID'); 

                const keywordsToInsert = keywordIDs.map(keyword => {
                    return {
                        projectID: newProject.projectID, 
                        keywordID: keyword.keywordID 
                    };
                });

                if (keywordsToInsert.length > 0) {
                    await trx('ProjectsKeywords').insert(keywordsToInsert); 
                    
                    // --- NOVA LÓGICA DE ASSOCIAÇÃO AUTOMÁTICA ---

                    // 3. Busca Comunidades que usam essas mesmas Keywords
                    // Usamos .distinct() para evitar duplicatas (caso uma comunidade tenha React E Node, por exemplo)
                    const matchingCommunities = await trx('CommunitiesKeywords')
                        .whereIn('keywordID', keywordIDs.map(k => k.keywordID))
                        .distinct('communityID');

                    if (matchingCommunities.length > 0) {
                        const communitiesToLink = matchingCommunities.map(comm => ({
                            projectID: newProject.projectID,
                            communityID: comm.communityID,
                            associatedAt: new Date() 
                        }));

                        await trx('ProjectCommunities').insert(communitiesToLink);
                    }
                }
            }
            
            return newProject;
        });
    }

    async updateProject(projectId: string, projectData: Partial<any>, userId: number) {
        
        return knex.transaction(async (trx) => {
            
            const existingProject = await trx('Projects') 
                .where({ projectID: projectId })
                .first();

            if (!existingProject) {
                throw new Error("Projeto não encontrado.");
            }

            if (existingProject.creatorID !== userId) {
                throw new Error("Você não tem permissão para editar este projeto.");
            }

            const fieldsToUpdate: any = {};
            if (projectData.title !== undefined) fieldsToUpdate.title = projectData.title;
            if (projectData.description !== undefined) fieldsToUpdate.description = projectData.description;
            if (projectData.status !== undefined) fieldsToUpdate.status = projectData.status;
            if (projectData.startDate !== undefined) fieldsToUpdate.startDate = projectData.startDate;

            if (Object.keys(fieldsToUpdate).length > 0) {
                fieldsToUpdate.updatedAt = new Date();
                await trx('Projects')
                    .where({ projectID: projectId })
                    .update(fieldsToUpdate);
            }

            if (projectData.technologies !== undefined) {
                
                await trx('ProjectsKeywords')
                    .where({ projectID: projectId })
                    .del();

                await trx('ProjectCommunities')
                    .where({ projectID: projectId })
                    .del();

                if (Array.isArray(projectData.technologies) && projectData.technologies.length > 0) {
                    
                    const keywordIDs = await trx('Keywords')
                        .whereIn('tag', projectData.technologies)
                        .select('keywordID');

                    const keywordsToInsert = keywordIDs.map((k: any) => ({
                        projectID: projectId,
                        keywordID: k.keywordID
                    }));

                    if (keywordsToInsert.length > 0) {
                        await trx('ProjectsKeywords').insert(keywordsToInsert);
                    }

                    const matchingCommunities = await trx('CommunitiesKeywords')
                        .whereIn('keywordID', keywordIDs.map((k:any) => k.keywordID))
                        .distinct('communityID');

                    if (matchingCommunities.length > 0) {
                        const communitiesToLink = matchingCommunities.map((comm:any) => ({
                            projectID: projectId,
                            communityID: comm.communityID,
                            associatedAt: new Date()
                        }));

                        await trx('ProjectCommunities').insert(communitiesToLink);
                    }
                }
            }

            return await trx('Projects').where({ projectID: projectId }).first();
        });
    }

    async userProjects(creatorID: number){

        const projects = await knex('Projects')
                        .where('creatorID', creatorID);
        
        return projects;
    }

    async newComment(userID: number, projectID: string, content: string){
        
        const project = await knex('Projects').where('projectID', projectID).first();
        
        if (!project) throw new Error("Projeto não encontrado.");

        const [newComment] = await knex('Comments').insert({
            authorID: userID,
            projectID: projectID,
            content: content,
            createdAt: new Date()
        }).returning('*');

        return newComment;
    }

    async getProjectComments(projectID: string){
        const comments = await knex('Comments')
            .join('User', 'Comments.authorID', '=', 'User.id') 
            .where('Comments.projectID', projectID)
            .select(
                'Comments.*',           
                'User.fullName',        
                'User.username'         
            )
            .orderBy('Comments.createdAt', 'desc'); 

        return comments;
    }

    async getUserComments(userID: number){
        const comments = await knex('Comments')
            .join('Projects', 'Comments.projectID', '=', 'Projects.projectID')
            .where('Comments.authorID', userID)
            .select(
                'Comments.*',           
                'Projects.title as projectTitle' 
            )
            .orderBy('Comments.createdAt', 'desc')
            .orderBy('Comments.commentID', 'desc');

        return comments;
    }

    async removeComment(userID: number, commentID: string){

        const comment = await knex('Comments')
            .where('commentID', commentID)
            .first();

        if (!comment) {
            throw new Error("Comentário não encontrado.");
        }

        if (comment.authorID !== userID) {
            throw new Error("Você não tem permissão para deletar este comentário.");
        }

        await knex('Comments')
            .where('commentID', commentID)
            .del();
        
    }

    async removeProject(creatorID: number, projectID: string){
        
        const project = await knex('Projects')
            .where('projectID', projectID)
            .first();

        if (!project) {
            throw new Error("Projeto não encontrado.");
        }

        if (project.creatorID !== creatorID) {
            throw new Error("Você não tem permissão para deletar este projeto.");
        }

        await knex('Projects')
            .where('projectID', projectID)
            .del();
    }

    async getProjectById(projectId: string) {
        // Busca o projeto com dados do autor (join)
        const project = await knex('Projects')
            .join('User', 'Projects.creatorID', '=', 'User.id')
            .where('Projects.projectID', projectId)
            .select(
                'Projects.*',
                'User.username as authorUsername',
                'User.fullName as authorName',
                'User.id as authorID'
            )
            .first();

        if (!project) {
            throw new Error("Projeto não encontrado.");
        }

        // Busca as tecnologias (keywords) associadas
        const keywords = await knex('ProjectsKeywords')
            .join('Keywords', 'ProjectsKeywords.keywordID', '=', 'Keywords.keywordID')
            .where('ProjectsKeywords.projectID', projectId)
            .select('Keywords.tag');

        // Retorna o objeto formatado
        return {
            ...project,
            technologies: keywords.map((k: any) => k.tag)
        };
    }
    
}

export default new BusinessLogicProject();