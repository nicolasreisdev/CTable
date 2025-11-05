
export interface commentData{
    commentID: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
}


class Comment{
    commentID: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;

    constructor(data: commentData){
        this.commentID = data.commentID
        this.content = data.content
        this.createdAt = data.createdAt
        this.updatedAt = data.updatedAt
    }
}