import request from 'supertest';
import app from '../app';
import knex from '../data';

let tokenUserA: string;
let userA_Id: number;
let tokenUserB: string;
let userB_Id: number;

beforeAll(async () => {
  await knex.migrate.latest();
});

beforeEach(async () => {
  await knex('Comments').del();
  await knex('ProjectCommunities').del();
  await knex('ProjectsKeywords').del();
  await knex('Projects').del();
  await knex('User').del();

  await request(app).post('/api/register').send({
    nomeCompleto: 'User A', username: 'usera', email: 'a@test.com', dataNascimento: '1990/01/01', senha: '123'
  });
  const loginA = await request(app).post('/api/login').send({ username: 'usera', senha: '123' });
  tokenUserA = loginA.body.token;
  userA_Id = loginA.body.user.id;

  await request(app).post('/api/register').send({
    nomeCompleto: 'User B', username: 'userb', email: 'b@test.com', dataNascimento: '1990/01/01', senha: '123'
  });
  const loginB = await request(app).post('/api/login').send({ username: 'userb', senha: '123' });
  tokenUserB = loginB.body.token;
  userB_Id = loginB.body.user.id;
});

afterAll(async () => {
  await knex.destroy();
});

describe('Dados do Perfil e Isolamento de Usuários', () => {

  describe('GET /api/user/projects', () => {
    it('deve retornar APENAS os projetos do usuário logado', async () => {
      // User A cria um projeto
      await request(app).post('/api/user/newproject')
        .set('Authorization', `Bearer ${tokenUserA}`)
        .send({ title: 'Projeto do A', description: 'Desc', status: 'Aberto', startDate: new Date() });

      // User B cria um projeto
      await request(app).post('/api/user/newproject')
        .set('Authorization', `Bearer ${tokenUserB}`)
        .send({ title: 'Projeto do B', description: 'Desc', status: 'Aberto', startDate: new Date() });

      // Teste: Acessando como User A
      const responseA = await request(app)
        .get('/api/user/projects')
        .set('Authorization', `Bearer ${tokenUserA}`);

      expect(responseA.status).toBe(200);
      expect(responseA.body.projects).toHaveLength(1);
      expect(responseA.body.projects[0].title).toBe('Projeto do A');

      // Teste: Acessando como User B
      const responseB = await request(app)
        .get('/api/user/projects')
        .set('Authorization', `Bearer ${tokenUserB}`);

      expect(responseB.status).toBe(200);
      expect(responseB.body.projects).toHaveLength(1);
      expect(responseB.body.projects[0].title).toBe('Projeto do B');
    });

    it('deve retornar lista vazia se o usuário não tiver projetos', async () => {
      const response = await request(app)
        .get('/api/user/projects')
        .set('Authorization', `Bearer ${tokenUserA}`);

      expect(response.status).toBe(200);
      expect(response.body.projects).toHaveLength(0);
    });
  });

  describe('GET /api/user/comments', () => {
    it('deve retornar corretamente os comentários feitos pelo usuário', async () => {
      const projectRes = await request(app).post('/api/user/newproject')
        .set('Authorization', `Bearer ${tokenUserA}`)
        .send({ title: 'Base Project', description: '...', status: 'Aberto', startDate: new Date() });
      const projectId = projectRes.body.project.projectID;

      await request(app).post(`/api/project/${projectId}/comments`)
        .set('Authorization', `Bearer ${tokenUserA}`)
        .send({ content: 'Comentário do A' });

      await request(app).post(`/api/project/${projectId}/comments`)
        .set('Authorization', `Bearer ${tokenUserB}`)
        .send({ content: 'Comentário do B' });

      const resA = await request(app)
        .get('/api/user/comments')
        .set('Authorization', `Bearer ${tokenUserA}`);
      
      expect(resA.status).toBe(200);
      expect(resA.body).toHaveLength(1);
      expect(resA.body[0].content).toBe('Comentário do A');
      expect(resA.body[0]).toHaveProperty('projectTitle');

      const resB = await request(app)
        .get('/api/user/comments')
        .set('Authorization', `Bearer ${tokenUserB}`);
      
      expect(resB.status).toBe(200);
      expect(resB.body).toHaveLength(1);
      expect(resB.body[0].content).toBe('Comentário do B');
    });
  });

  describe('Segurança e Isolamento de Edição/Exclusão', () => {
    
    it('edição do perfil do Usuário A não deve alterar dados do Usuário B', async () => {
      const response = await request(app)
        .put('/api/user/editprofile')
        .set('Authorization', `Bearer ${tokenUserA}`)
        .send({ nomeCompleto: 'User A Modificado' });

      expect(response.status).toBe(200);
      expect(response.body.fullName).toBe('User A Modificado');

      const userB_Db = await knex('User').where({ id: userB_Id }).first();
      expect(userB_Db.fullName).toBe('User B'); 
    });

    it('exclusão do perfil do Usuário A não deve excluir o Usuário B', async () => {
      const response = await request(app)
        .delete('/api/user/deleteprofile')
        .set('Authorization', `Bearer ${tokenUserA}`);

      expect(response.status).toBe(200);

      const userA_Db = await knex('User').where({ id: userA_Id }).first();
      expect(userA_Db).toBeUndefined();

      const userB_Db = await knex('User').where({ id: userB_Id }).first();
      expect(userB_Db).toBeDefined();
      expect(userB_Db.username).toBe('userb');
    });

    it('tentativa de editar perfil sem token deve ser barrada (401)', async () => {
      const response = await request(app)
        .put('/api/user/editprofile')
        .send({ nomeCompleto: 'Hacker' });

      expect(response.status).not.toBe(200);
    });

  });
});