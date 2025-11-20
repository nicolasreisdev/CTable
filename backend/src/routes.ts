import express from 'express';
import requestController from './controller/requestController';
import authMiddleware from './middleware/auth';
import { z } from 'zod';

const routes = express.Router();

// Endpoint para CADASTRAR um novo usuário
routes.post('/api/register', async (request, response) => {
  try{

    console.log("Recebendo requisição de cadastro:", request.body);
    const {user, token} = await requestController.createUser(request.body);
    return response.status(201).json({ 
      user, 
      token, 
      message: 'Usuário cadastrado com sucesso!' 
    });
    
  }catch(error){

    if (error instanceof z.ZodError) {
      console.log("Enviando erro de validação 400 para o cliente...");
      return response.status(400).json({ 
           message: "Erro de validação",
           errors: error.flatten().fieldErrors 
      });
    }

    if(error instanceof Error){
      if (error.message.includes("já está em uso")) {
          console.log("Enviando erro de duplicidade 400...");
          return response.status(400).json({ message: error.message });
      }
    }
    
    console.error("Erro interno no servidor:", error);
    return response.status(500).json({ message: "Erro interno no servidor." });
  }
});

// Endpoint para verificar a existência de usuário
routes.post('/api/login', async(request, response) => {
  try{

    const { user, token } = await requestController.enterUser(request.body);
    // console.log('Login: ' + user, token);
    return response.status(200).json({
        user,
        token,
        message: 'Usuário autenticado com sucesso.'
    });

  }catch(error){

    if(error instanceof Error){
      if(error.message.includes("Usuário ou senha incorretos.")){
        console.log("Erro de username ou senha");
        return response.status(400).json({ message: error.message });
      }
    }

  }
});

// Endpoint para criar projeto
routes.post('/api/user/newproject', authMiddleware,  async(request, response) =>{
  try{

    const projectData = request.body;
        
    const creatorID = request.user.id; 

    const newProject = await requestController.createProject(projectData, creatorID);
        
    return response.status(201).json({
        message: "Projeto criado com sucesso!",
        project: newProject
    });
    
  }catch(error){

    if (error instanceof z.ZodError) { 
      return response.status(400).json({ 
           message: "Erro de validação",
           errors: error.flatten().fieldErrors 
      });
    }

    if(error instanceof Error){ 
      return response.status(400).json({ message: error.message });
    }
    
    console.error("Erro interno no servidor:", error);
    return response.status(500).json({ message: "Erro interno no servidor." });

  }
});


// Endpoint para enviar ao fronend os keywords disponíveis
routes.get('/api/keywords', async(request, response) => {
  try{

    const tags = await requestController.getKeywords();

    return response.status(200).json(tags);

  }catch(error){
    console.log(error);
    return response.status(500).json({ message: "Erro ao buscar as palavras-chave." });
  }
})

// Endpoint para enviar ao frontend os projetos de determinado usuário
routes.get('/api/user/projects', authMiddleware, async(request, response) => {
    try{

      const creatorID = request.user.id;
      const projects = await requestController.getUserProjects(creatorID);
      return response.status(200).json({
        projects
      })

    }catch(error){
      
      if(error instanceof Error){ 
        return response.status(400).json({ message: error.message });
      }
      
      console.error("Erro interno ao buscar projetos:", error);
      return response.status(500).json({ message: "Erro interno no servidor." });
    
    }
})

// Endpoint para atualizar um projeto existente
routes.put('/api/user/updateproject/:projectId', authMiddleware, async(request, response) => {
  try{
    const { projectId } = request.params;
    const updatedData = request.body;
    const creatorID = request.user.id;

    const updatedProject = await requestController.updateProject(projectId, updatedData, creatorID);

    return response.status(200).json({
      message: "Projeto atualizado com sucesso!",
      project: updatedProject
    });

  }catch(error){

    if (error instanceof z.ZodError) { 
      return response.status(400).json({ 
           message: "Erro de validação",
           errors: error.flatten().fieldErrors 
      });
    }

    if(error instanceof Error){ 
      return response.status(400).json({ message: error.message });
    }
    
    console.error("Erro interno no servidor:", error);
    return response.status(500).json({ message: "Erro interno no servidor." });

  }
});

export default routes;