import knex from '../data/index';
import { Community, communityData } from '../models/Community'



class businessLogicCommunity{

    async newCommunity(data: communityData){
        console.log("Lógica de negócios de criação de comunidade");
    }

    updateCommunity(){

    }

    removeCommunity(){

    }
    
}


export default new businessLogicCommunity();