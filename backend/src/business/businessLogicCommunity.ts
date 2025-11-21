import knex from '../data/index';
import { communityData } from '../models/Community'



class businessLogicCommunity{

    async newCommunity(data: communityData, creatorID: number){
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

            return createdCommunity;
        });
    }

    updateCommunity(){

    }

    removeCommunity(){

    }
    
}


export default new businessLogicCommunity();