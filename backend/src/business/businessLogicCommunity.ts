import knex from '../data/index';
import { CommunityData } from '../models/Community'



class businessLogicCommunity{

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

    async getAllCommunities(userID: number) {

        const userCommunities = await knex('Communities')
            .join('CommunityMembers', 'Communities.communityID', '=', 'CommunityMembers.communityID')
            .where('CommunityMembers.userID', userID)
            .select(
                'Communities.*', 
                'CommunityMembers.role', 
                'CommunityMembers.joinedAt'
            );

        return userCommunities;
        
    }

    updateCommunity(){

    }

    removeCommunity(){

    }
    
}


export default new businessLogicCommunity();