import express from 'express';
import RequestController from './controller/requestController';
import authMiddleware from './middleware/auth';
import auth from './middleware/auth';
import { request } from 'http';

const routes = express.Router();

routes.post('/api/register', async (request, response) => {
    console.log("Recebendo requisição de cadastro:", request.body);
    const {user, token} = await RequestController.createUser(request.body);
    return response.status(201).json({ 
      user, 
      token, 
      message: 'Usuário cadastrado com sucesso!' 
    });
});

routes.post('/api/login', async(request, response) => {
    const { user, token } = await RequestController.enterUser(request.body);
    return response.status(200).json({
        user,
        token,
        message: 'Usuário autenticado com sucesso.'
    });
});



routes.get('/api/keywords', async(request, response) => {
    const tags = await RequestController.getKeywords();

    return response.status(200).json(tags);
});

routes.post('/api/user/newproject', authMiddleware,  async(request, response) =>{
    const projectData = request.body;
        
    const creatorID = request.user.id; 

    const newProject = await RequestController.createProject(projectData, creatorID);
        
    return response.status(201).json({
        message: "Projeto criado com sucesso!",
        project: newProject
    });
});



routes.get('/api/user/projects', authMiddleware, async(request, response) => {
      const creatorID = request.user.id;
      const projects = await RequestController.getUserProjects(creatorID);
      return response.status(200).json({
        projects
      })
});

routes.put('/api/user/updateproject/:projectId', authMiddleware, async(request, response) => {
    const { projectId } = request.params;
    const updatedData = request.body;
    const creatorID = request.user.id;

    const updatedProject = await RequestController.updateProject(projectId, updatedData, creatorID);

    return response.status(200).json({
      message: "Projeto atualizado com sucesso!",
      project: updatedProject
    });
});

routes.delete('/api/user/deleteproject/:projectId', authMiddleware, async(request, response) =>{

    const { projectId } = request.params;

    await RequestController.removeProject(request.user.id, projectId);

    return response.status(200).json({ message: "Projeto deletado com sucesso." });
});


routes.delete('/api/user/leavecommunity/:communityID', authMiddleware, async(request, response) =>{

    const { communityID } = request.params;

    const result = await RequestController.leaveMemberCommunity(request.user.id, communityID);

    return response.status(200).json(result);
})

routes.post('/api/newcommunity', authMiddleware, async(request, response) => {

    const newCommunity = await RequestController.newCommunity(request.body, request.user.id);
    return response.status(201).json({
      community: newCommunity
    })
    
});

routes.get('/api/user/communities', authMiddleware, async (request, response) => {

    const communities = await RequestController.getAllUserCommunities(request.user.id);
    return response.status(200).json(communities);

});

routes.get('/api/communities/data/:communityId', authMiddleware, async (request, response) =>{

    const { communityId } = request.params;
    const userID = request.user.id;

    const data = await RequestController.getCommunityData(communityId, userID);

    return response.status(200).json(data);
});

routes.get('/api/communities', async(request, response) => {

    const communities = await RequestController.getAllCommunities();
    return response.status(200).json(communities);

});

routes.post('/api/communities/:communityId/join', authMiddleware, async(request, response) =>{

    const userID = request.user.id;
    const { communityId } = request.params;

    const result = await RequestController.newMemberCommunity(userID, communityId);

    return response.status(201).json(result);
});


routes.put('/api/communities/updatecommunity/:communityId', authMiddleware, async(request, response) => {
    const { communityId } = request.params;
    const data = request.body;

    const updatedCommunity = await RequestController.updateCommunity(request.user.id, communityId, data);

    return response.status(200).json({
      message: "Comunidade atualizada com sucesso!",
      community: updatedCommunity
    });

});


routes.delete('/api/communities/deletecommunity/:communityId', authMiddleware, async(request, response) => {
    const { communityId } = request.params;

    await RequestController.removeCommunity(request.user.id, communityId);

    return response.status(200).json({ message: "Comunidade deletada com sucesso." });

})


routes.post('/api/project/:projectID/comments', authMiddleware, async(request, response) =>{

    const { projectID } = request.params;
    const { content } = request.body;

    const comment = await RequestController.newComment(request.user.id, projectID, content);

    return response.status(201).json(comment);

})

routes.get('/api/user/comments', authMiddleware, async(request, response) => {
    
    const allComments = await RequestController.getUserComments(request.user.id);

    return response.status(200).json(allComments);
})

routes.delete('/api/project/:commentID/deletecomment', authMiddleware, async(request, response) =>{

    const { commentID } = request.params;    

    await RequestController.deleteComment( request.user.id, commentID );

    return response.status(200).json({ message: "Comentário deletado com sucesso."});

})

routes.get('/api/project/:projectID/comments', async(request, response) => {

    const { projectID } = request.params;

    const projectComments = await RequestController.getProjectComments( projectID );

    return response.status(200).json(projectComments);

})


routes.put('/api/user/editprofile', authMiddleware, async(request, response) =>{

    const updatedProfile = await RequestController.updateProfile(request.body, request.user.id);

    return response.status(200).json(updatedProfile);
})

routes.delete('/api/user/deleteprofile', authMiddleware, async(request, response) =>{
   
    const message = await RequestController.deleteProfile(request.user.id);

    return response.status(200).json(message);
})

routes.get('/api/user/home', authMiddleware, async(request, response) => {
    
    const homeData = await RequestController.getUserHome(request.user.id);
    
    return response.status(200).json(homeData);
})

routes.get('/api/projects/:projectId', authMiddleware, async (request, response) => {
    const { projectId } = request.params;
    try {
        const project = await RequestController.getProjectById(projectId);
        return response.status(200).json(project);
    } catch (error) {
        return response.status(404).json({ message: "Projeto não encontrado" });
    }
});


export default routes;