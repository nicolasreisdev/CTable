
export interface userData {
    nomeCompleto: string;
    username: string;
    email: string;
    telefone: string;
    dataNascimento: Date;
}
class User{
    // userId: string;
    fullName: string;
    username: string;
    // password: string;
    birthDate: Date;
    // createdAt: Date;
    // updatedAt: Date;

    constructor(data: userData){
        this.fullName = data.nomeCompleto
        this.username = data.username
        this.birthDate = data.dataNascimento
        
    }

    createProject(){

    }

    updateProfile(){

    }

    deleteProfile(){

    }

    joinCommunity(){

    }

    leaveCommunity(){

    }

    postComment(){

    }

    deleteComment(){

    }

    manageComment(){

    }

    getUserID(){
        
    }

    getFullName(){
        return this.fullName
    }


}

// export default new User();
