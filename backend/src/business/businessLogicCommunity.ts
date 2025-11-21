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

    updateCommunity(){

    }

    removeCommunity(){

    }
    
}


export default new businessLogicCommunity();