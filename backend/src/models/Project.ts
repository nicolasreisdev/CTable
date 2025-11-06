
export interface projectData{
    projectID: string;
    title: string;
    description: string;
    technologies: string[];
    status: string;
    startDate: Date;
    createdAt: Date;
    updatedA: Date;
}


class Project{
    projectID: string;
    title: string;
    description: string;
    technologies: string[];
    status: string;
    startDate: Date;
    createdAt: Date;
    updatedAt: Date;

    constructor(data: projectData){
        this.projectID = data.projectID
        this.title = data.title
        this.description = data.description
        this.technologies = data.technologies
        this.status = data.status
        this.startDate = data.startDate
        this.createdAt = data.createdAt
        this.updatedAt = data.updatedA
    }
}