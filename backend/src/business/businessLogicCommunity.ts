import knex from '../data/index';
import { Community, CommunityData } from '../models/Community'



class businessLogicCommunity{

    async newCommunity(data: CommunityData){
        console.log("Lógica de negócios de criação de comunidade");
    }

    updateCommunity(){

    }

    removeCommunity(){

    }
    
}


export default new businessLogicCommunity();