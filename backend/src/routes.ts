import express from 'express';
import requestController , { userData } from './controller/requestController';
import { z } from 'zod';

const routes = express.Router();

// Endpoint para CADASTRAR um novo usuário
routes.post('/api/register', async (request, response) => {
  try{
    console.log("Recebendo requisição de cadastro:", request.body);
    await requestController.createUser(request.body);
    return response.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
    
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
        token
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


export default routes;