import knex from '../data/index';
import { CommunityData } from '../models/Community'



class BusinessLogicCommunity{

    async newCommunity(data: CommunityData, creatorID: number){

        const existingCommunity = await knex('Communities')
            .where('name', data.name)
            .first();

        if (existingCommunity) {
            throw new Error("Já existe uma comunidade com este nome.");
        }

        return knex.transaction(async (trx) => {
            
            const communityToInsert = {
                name: data.name,
                description: data.description,
                creatorID: creatorID 
            };

            const [createdCommunity] = await trx('Communities')
                .insert(communityToInsert)
                .returning('*');

            if (!createdCommunity) {
                throw new Error("Falha ao criar comunidade.");
            }

            await trx('CommunityMembers').insert({
                communityID: createdCommunity.communityID, 
                userID: creatorID,
                role: 'admin',
                joinedAt: new Date()
            });

            if (data.technologies && data.technologies.length > 0) {
                
                const keywordIDs = await trx('Keywords')
                                        .whereIn('tag', data.technologies)
                                        .select('keywordID');

                const keywordsToInsert = keywordIDs.map(keyword => {
                    return {
                        communityID: createdCommunity.communityID, 
                        keywordID: keyword.keywordID               
                    };
                });

                if (keywordsToInsert.length > 0) {
                    await trx('CommunitiesKeywords').insert(keywordsToInsert);
                }
            }

            return createdCommunity;
        });
    }

    async newMemberCommunity(userID: number, communityID: string){

        const community = await knex('Communities')
            .where('communityID', communityID) 
            .first();

        if (!community) {
            throw new Error("Comunidade não encontrada.");
        }

        const existingMember = await knex('CommunityMembers')
            .where('communityID', communityID)
            .andWhere('userID', userID)
            .first();

        if (existingMember) {
            throw new Error("Usuário já é membro desta comunidade.");
        }

        await knex('CommunityMembers').insert({
            communityID: communityID,
            userID: userID,
            role: 'member',
            joinedAt: new Date()
        });

        return { message: "Membro adicionado com sucesso", communityID, userID };
    }

    async leaveMemberCommunity(userID: number, communityID: string){
        
        const community = await knex('Communities')
            .where('communityID', communityID)
            .first();

        if (!community) {
            throw new Error("Comunidade não encontrada.");
        }

        if (community.creatorID === userID) {
            throw new Error("O criador não pode sair da comunidade. Você deve deletá-la ou transferir a propriedade.");
        }

        const member = await knex('CommunityMembers')
            .where({ communityID, userID })
            .first();

        if (!member) {
            throw new Error("Você não é membro desta comunidade.");
        }

        await knex('CommunityMembers')
            .where({ communityID, userID })
            .del();
            
        return { message: "Você saiu da comunidade com sucesso." };
    }

    async getAllUserCommunities(userID: number) {

        const userCommunities = await knex('Communities')
            .join('CommunityMembers', 'Communities.communityID', '=', 'CommunityMembers.communityID')
            .where('CommunityMembers.userID', userID)
            .select(
                'Communities.*', 
                'CommunityMembers.role', 
                'CommunityMembers.joinedAt'
            );

        const communityIds = userCommunities.map(c => c.communityID);

        if (communityIds.length === 0) return [];

        const keywords = await knex('CommunitiesKeywords')
            .join('Keywords', 'CommunitiesKeywords.keywordID', '=', 'Keywords.keywordID')
            .whereIn('CommunitiesKeywords.communityID', communityIds)
            .select('CommunitiesKeywords.communityID', 'Keywords.tag');

        const result = userCommunities.map(comm => ({
            ...comm,
            technologies: keywords
                .filter((k: any) => k.communityID === comm.communityID) 
                .map((k: any) => k.tag) 
        }));

        return result;
    }

    async getAllCommunities(){
        const communities = await knex('Communities').select('*');

        const communityIds = communities.map(c => c.communityID);

        if (communityIds.length === 0) return [];

        const keywords = await knex('CommunitiesKeywords')
            .join('Keywords', 'CommunitiesKeywords.keywordID', '=', 'Keywords.keywordID')
            .whereIn('CommunitiesKeywords.communityID', communityIds)
            .select('CommunitiesKeywords.communityID', 'Keywords.tag');

        const result = communities.map(comm => ({
            ...comm,
            technologies: keywords
                .filter((k: any) => k.communityID === comm.communityID)
                .map((k: any) => k.tag)
        }));

        return result;
    }

    async getCommunityData(communityID: string, userID: number) {

        const community = await knex('Communities')
            .where('communityID', communityID)
            .first();

        if (!community) {
            throw new Error("Comunidade não encontrada.");
        }

        const membership = await knex('CommunityMembers')
            .where({ communityID: communityID, userID: userID })
            .first();
        
        const isMember = !!membership;

        const keywords = await knex('CommunitiesKeywords')
        .join('Keywords', 'CommunitiesKeywords.keywordID', '=', 'Keywords.keywordID')
        .where('CommunitiesKeywords.communityID', communityID)
        .select('Keywords.tag');

        const memberCount = await knex('CommunityMembers')
        .where('communityID', communityID)
        .count('userID as count')
        .first();

        const projects = await knex('Projects')
            .join('ProjectCommunities', 'Projects.projectID', '=', 'ProjectCommunities.projectID')
            .where('ProjectCommunities.communityID', communityID)
            .select('Projects.*');

        return {
        community: {
            ...community,
            technologies: keywords.map((k: any) => k.tag),
            memberCount: memberCount?.count || 0,
            isMember: isMember
        },
        posts: projects || []
    };
    }   

    async updateCommunity(creatorID: number, communityID: string, data: CommunityData){

        return knex.transaction(async (trx) => {

            const community = await trx('Communities')
                .where('communityID', communityID)
                .first();

            if (!community) {
                throw new Error("Comunidade não encontrada.");
            }

            if (community.creatorID !== creatorID) {
                throw new Error("Você não tem permissão para editar esta comunidade.");
            }

            const fieldsToUpdate: any = {};
            if (data.name) fieldsToUpdate.name = data.name;
            if (data.description) fieldsToUpdate.description = data.description;
            
            if (Object.keys(fieldsToUpdate).length > 0) {
                fieldsToUpdate.updatedAt = new Date();
                await trx('Communities')
                    .where('communityID', communityID)
                    .update(fieldsToUpdate);
            }

            if (data.technologies !== undefined) { 
                 await trx('CommunitiesKeywords')
                    .where('communityID', communityID)
                    .del();

                 if (Array.isArray(data.technologies) && data.technologies.length > 0) {
                    const keywordIDs = await trx('Keywords')
                        .whereIn('tag', data.technologies)
                        .select('keywordID');

                    const linksToInsert = keywordIDs.map((k: any) => ({
                        communityID: communityID,
                        keywordID: k.keywordID
                    }));

                    if (linksToInsert.length > 0) {
                        await trx('CommunitiesKeywords').insert(linksToInsert);
                    }
                 }
            }

            return await trx('Communities').where('communityID', communityID).first();
        });
    }

    async removeCommunity(creatorID: number, communityID: string){
        const community = await knex('Communities')
            .where('communityID', communityID)
            .first();

        if (!community) {
            throw new Error("Comunidade não encontrada.");
        }

        if (community.creatorID !== creatorID) {
            throw new Error("Você não tem permissão para deletar esta comunidade.");
        }

        await knex('Communities')
            .where('communityID', communityID)
            .del();
    }
    
}


export default new BusinessLogicCommunity();