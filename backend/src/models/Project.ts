
export interface projectData{
    title: string;
    description: string;
    // technologies: string[];
    status: string;
    startDate: Date;
    // createdAt: Date;
    // updatedA: Date;
}


export class Project{
    title: string;
    description: string;
    // technologies: string[]; //keywords
    status: string;
    startDate: Date;
    // createdAt: Date;
    // updatedAt: Date;

    constructor(data: projectData){
        this.title = data.title
        this.description = data.description
        // this.technologies = data.technologies
        this.status = data.status
        this.startDate = data.startDate
        // this.createdAt = data.createdAt
        // this.updatedAt = data.updatedA
    }
}

