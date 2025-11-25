import express from 'express';
import RequestController from './controller/requestController';
import authMiddleware from './middleware/auth';
import auth from './middleware/auth';

const routes = express.Router();

// Endpoint para CADASTRAR um novo usuário
routes.post('/api/register', async (request, response) => {
    console.log("Recebendo requisição de cadastro:", request.body);
    const {user, token} = await RequestController.createUser(request.body);
    return response.status(201).json({ 
      user, 
      token, 
      message: 'Usuário cadastrado com sucesso!' 
    });
});

// Endpoint para verificar a existência de usuário
routes.post('/api/login', async(request, response) => {
    const { user, token } = await RequestController.enterUser(request.body);
    return response.status(200).json({
        user,
        token,
        message: 'Usuário autenticado com sucesso.'
    });
});


// Endpoint para enviar ao fronend os keywords disponíveis
routes.get('/api/keywords', async(request, response) => {
    const tags = await RequestController.getKeywords();

    return response.status(200).json(tags);
});

// Endpoint para criar projeto
routes.post('/api/user/newproject', authMiddleware,  async(request, response) =>{
    const projectData = request.body;
        
    const creatorID = request.user.id; 

    const newProject = await RequestController.createProject(projectData, creatorID);
        
    return response.status(201).json({
        message: "Projeto criado com sucesso!",
        project: newProject
    });
});


// Endpoint para enviar ao frontend os projetos de determinado usuário
routes.get('/api/user/projects', authMiddleware, async(request, response) => {
      const creatorID = request.user.id;
      const projects = await RequestController.getUserProjects(creatorID);
      return response.status(200).json({
        projects
      })
});

// Endpoint para atualizar um projeto existente
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

// Endpoint para criar uma comunidade
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

routes.get('/api/communities/data/:communityId', async (request, response) =>{

    const { communityId } = request.params;

    const data = await RequestController.getCommunityData(communityId);

    return response.status(200).json(data);
});

routes.get('/api/communities', async(request, response) => {

    const communities = await RequestController.getAllCommunities(request.user.id);
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


routes.delete('/api/communitites/deletecommunity/:communityId', authMiddleware, async(request, response) => {
    const { communityId } = request.params;

    await RequestController.removeCommunity(request.user.id, communityId);

    return response.status(200).json({ message: "Comunidade deletada com sucesso." });

})

export default routes;