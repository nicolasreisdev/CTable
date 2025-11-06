import express from 'express';
import requestController , { userData } from './controller/requestController';
import { z } from 'zod';

const routes = express.Router();

// Endpoint para CADASTRAR um novo usuário
routes.post('/api/usuarios', async (request, response) => {
  try{
    // 1. Capturar os dados do corpo da requisição
    const { nomeCompleto, username, email, senha, telefone, dataNascimento } = request.body;

    // 2. AQUI ENTRA A LÓGICA DE NEGÓCIO
    //    - Validar os dados (verificar se não estão vazios)
      const userData: userData = {
          nomeCompleto,
          username,
          email,
          telefone,
          dataNascimento
      };

      await requestController.create(userData);
    //    - Criptografar a senha (NUNCA salve senhas em texto puro)
    //    - Inserir os dados no banco de dados com o Knex

    // 3. Retornar uma resposta
    // O status 201 significa "Created" (Criado com sucesso)
    return response.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
    
  }catch(error){
    if (error instanceof z.ZodError) {
      console.log("Enviando erro de validação 400 para o cliente...");
      return response.status(400).json({ 
           message: "Erro de validação",
           errors: error.flatten().fieldErrors 
      });
    }
    
    console.error("Erro interno no servidor:", error);
    return response.status(500).json({ message: "Erro interno no servidor." });
  }
});


export default routes;