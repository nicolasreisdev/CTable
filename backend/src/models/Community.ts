
export interface communityData{
    communityID: string;
    name: string;
    description: string;
    keywords: string;
    createdAt: Date;
    updatedAt: Date;
}


class Community {
    communityID: string;
    name: string;
    description: string;
    keywords: string;
    createdAt: Date;
    updatedAt: Date;

    constructor(data: communityData){
        this.communityID = data.communityID
        this.name = data.name
        this.description = data.description
        this.keywords = data.keywords
        this.createdAt = data.createdAt
        this.updatedAt = data.updatedAt
    }

}