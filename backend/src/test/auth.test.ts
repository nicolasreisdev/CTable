import request from 'supertest';
import app from '../app';
import knex from '../data'; 

beforeAll(async () => {
  await knex.migrate.latest();
});

beforeEach(async () => {
  await knex('User').truncate(); 
});

afterAll(async () => {
  await knex.destroy();
});


describe('Autenticação de Usuário', () => {
  
  describe('POST /api/register', () => {
    
    it('deve cadastrar um novo usuário com sucesso (Status 201)', async () => {
      const novoUsuario = {
        nomeCompleto: 'Usuário de Teste',
        username: 'testuser',
        email: 'teste@email.com',
        telefone: '123456789',
        dataNascimento: '2000/01/01',
        senha: 'senha123',
      };

      const response = await request(app)
        .post('/api/register')
        .send(novoUsuario);

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('Usuário cadastrado com sucesso!');

      const userNoDb = await knex('User').where({ username: 'testuser' }).first();
      expect(userNoDb).toBeDefined();
      expect(userNoDb.email).toBe('teste@email.com');
    });

    it('deve impedir cadastro de username duplicado (Status 400)', async () => {
    
      await request(app).post('/api/register').send({
        nomeCompleto: 'Usuário 1',
        username: 'duplicado',
        email: 'user1@email.com',
        dataNascimento: '2000/01/01',
        senha: 'senha123',
      });

      const response = await request(app).post('/api/register').send({
        nomeCompleto: 'Usuário 2',
        username: 'duplicado',
        email: 'user2@email.com',
        dataNascimento: '2000/01/01',
        senha: 'outrasenha',
      });

      expect(response.status).toBe(400);
      expect(response.body.message).toContain('Este username já está em uso.');
    });
  });


  describe('POST /api/login', () => {
    
    beforeEach(async () => {
      await request(app).post('/api/register').send({
        nomeCompleto: 'Login Test',
        username: 'logintest',
        email: 'login@email.com',
        dataNascimento: '2000/01/01',
        senha: 'senhaforte', 
      });
    });

    it('deve autenticar um usuário com credenciais corretas (Status 200)', async () => {
      const response = await request(app)
        .post('/api/login')
        .send({
          username: 'logintest',
          senha: 'senhaforte' 
        });

      expect(response.status).toBe(200);
      expect(response.body.user).toBeDefined();
      expect(response.body.token).toBeDefined();
      expect(response.body.user.username).toBe('logintest');
    });

    it('deve rejeitar login com senha incorreta (Status 400)', async () => {
      const response = await request(app)
        .post('/api/login')
        .send({
          username: 'logintest',
          senha: 'senhaerrada' 
        });
      
      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Usuário ou senha incorretos.');
    });
  });
});