import request from 'supertest';
import app from '../app';
import knex from '../data';

let tokenUser1: string;
let tokenUser2: string;
let user1Id: number;

beforeAll(async () => {
  await knex.migrate.latest();
});

beforeEach(async () => {
  await knex('Comments').del();
  await knex('ProjectCommunities').del();
  await knex('ProjectsKeywords').del();
  await knex('Projects').del();
  await knex('CommunitiesKeywords').del();
  await knex('CommunityMembers').del();
  await knex('Communities').del();
  await knex('Keywords').del();
  await knex('User').del();

  await knex('Keywords').insert([
    { tag: 'React' }, 
    { tag: 'Node' }, 
    { tag: 'Java' },
    { tag: 'Express' }
  ]);

  await request(app).post('/api/register').send({
    nomeCompleto: 'Project Owner', username: 'owner', email: 'owner@test.com', dataNascimento: '1990/01/01', senha: '123'
  });
  const resLogin1 = await request(app).post('/api/login').send({ username: 'owner', senha: '123' });
  tokenUser1 = resLogin1.body.token;
  user1Id = resLogin1.body.user.id;

  await request(app).post('/api/register').send({
    nomeCompleto: 'Intruder', username: 'intruder', email: 'intruder@test.com', dataNascimento: '1990/01/01', senha: '123'
  });
  const resLogin2 = await request(app).post('/api/login').send({ username: 'intruder', senha: '123' });
  tokenUser2 = resLogin2.body.token;
});

afterAll(async () => {
  await knex.destroy();
});

describe('Fluxo de Projetos', () => {

  it('deve criar um novo projeto com sucesso (Status 201)', async () => {
    const response = await request(app)
      .post('/api/user/newproject')
      .set('Authorization', `Bearer ${tokenUser1}`) // Envia o token no header
      .send({
        title: 'Meu Projeto React',
        description: 'Um projeto de teste',
        status: 'Em andamento',
        startDate: new Date(),
        technologies: ['React', 'Node']
      });

    expect(response.status).toBe(201);
    expect(response.body.project).toHaveProperty('projectID');
    expect(response.body.project.title).toBe('Meu Projeto React');

    const projectDb = await knex('Projects').where({ title: 'Meu Projeto React' }).first();
    expect(projectDb).toBeDefined();
  });

  it('deve listar os projetos do usuário (Status 200)', async () => {
    await request(app)
      .post('/api/user/newproject')
      .set('Authorization', `Bearer ${tokenUser1}`)
      .send({
        title: 'Projeto Listagem',
        description: 'Desc',
        status: 'Aberto',
        startDate: new Date()
      });

    const response = await request(app)
      .get('/api/user/projects')
      .set('Authorization', `Bearer ${tokenUser1}`);

    expect(response.status).toBe(200);
    expect(response.body.projects.length).toBeGreaterThan(0);
    expect(response.body.projects[0].title).toBe('Projeto Listagem');
  });

  it('deve atualizar um projeto existente (Status 200)', async () => {
   
    const resCreate = await request(app)
      .post('/api/user/newproject')
      .set('Authorization', `Bearer ${tokenUser1}`)
      .send({ title: 'Antigo', description: 'Desc', status: 'Aberto', startDate: new Date() });
    
    const projectId = resCreate.body.project.projectID;

    const response = await request(app)
      .put(`/api/user/updateproject/${projectId}`)
      .set('Authorization', `Bearer ${tokenUser1}`)
      .send({
        title: 'Novo Título',
        description: 'Nova Descrição'
      });

    expect(response.status).toBe(200);
    expect(response.body.project.title).toBe('Novo Título');
  });

  it('deve deletar um projeto (Status 200)', async () => {
    const resCreate = await request(app)
      .post('/api/user/newproject')
      .set('Authorization', `Bearer ${tokenUser1}`)
      .send({ title: 'Para Deletar', description: 'Desc', status: 'Aberto', startDate: new Date() });
    
    const projectId = resCreate.body.project.projectID;

    const response = await request(app)
      .delete(`/api/user/deleteproject/${projectId}`)
      .set('Authorization', `Bearer ${tokenUser1}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Projeto deletado com sucesso.");

    const checkDb = await knex('Projects').where({ projectID: projectId }).first();
    expect(checkDb).toBeUndefined();
  });

  it('deve adicionar um comentário em um projeto (Status 201)', async () => {
    const resCreate = await request(app)
      .post('/api/user/newproject')
      .set('Authorization', `Bearer ${tokenUser1}`)
      .send({ title: 'Comentários', description: 'Desc', status: 'Aberto', startDate: new Date() });
    
    const projectId = resCreate.body.project.projectID;

    const response = await request(app)
      .post(`/api/project/${projectId}/comments`)
      .set('Authorization', `Bearer ${tokenUser1}`)
      .send({ content: 'Ótimo projeto!' });

    expect(response.status).toBe(201);
    expect(response.body.content).toBe('Ótimo projeto!');
  });

  it('deve associar projeto automaticamente à comunidade baseada na tecnologia', async () => {
    // Criar Comunidade de React
    const resComm = await request(app)
      .post('/api/newcommunity')
      .set('Authorization', `Bearer ${tokenUser1}`)
      .send({ name: 'React Devs', description: 'Desc', technologies: ['React'] });
    
    const communityId = resComm.body.community.communityID;

    // Criar Projeto com tecnologia React
    const resProj = await request(app)
      .post('/api/user/newproject')
      .set('Authorization', `Bearer ${tokenUser1}`)
      .send({
        title: 'App React Automático',
        description: 'Deve vincular sozinho',
        status: 'Aberto',
        startDate: new Date(),
        technologies: ['React']
      });
    
    const projectId = resProj.body.project.projectID;

    // Verificar se houve associação na tabela ProjectCommunities
    const association = await knex('ProjectCommunities')
        .where({ projectID: projectId, communityID: communityId })
        .first();
    
    expect(association).toBeDefined();
  });

  it('não deve permitir que outro usuário atualize meu projeto', async () => {
    // Criar projeto com User 1
    const res = await request(app).post('/api/user/newproject')
      .set('Authorization', `Bearer ${tokenUser1}`)
      .send({ title: 'Meu Projeto', description: '...', status: 'Aberto', startDate: new Date() });
    
    const projectId = res.body.project.projectID;

    // Tentar atualizar com User 2
    const response = await request(app)
      .put(`/api/user/updateproject/${projectId}`)
      .set('Authorization', `Bearer ${tokenUser2}`)
      .send({ title: 'Hacked' });

    expect(response.status).not.toBe(200);
    
    // Confirma que não mudou no banco
    const proj = await knex('Projects').where('projectID', projectId).first();
    expect(proj.title).toBe('Meu Projeto');
  });

  it('não deve permitir que outro usuário delete meu projeto', async () => {
    const res = await request(app).post('/api/user/newproject')
      .set('Authorization', `Bearer ${tokenUser1}`)
      .send({ title: 'Não Toque', description: '...', status: 'Aberto', startDate: new Date() });
    
    const projectId = res.body.project.projectID;

    const response = await request(app)
      .delete(`/api/user/deleteproject/${projectId}`)
      .set('Authorization', `Bearer ${tokenUser2}`);

    expect(response.status).not.toBe(200);

    const check = await knex('Projects').where('projectID', projectId).first();
    expect(check).toBeDefined();
  });

  it('deve impedir exclusão de comentário por quem não é o autor', async () => {
    
    const resProj = await request(app).post('/api/user/newproject')
      .set('Authorization', `Bearer ${tokenUser1}`)
      .send({ title: 'Post', description: '...', status: 'Aberto', startDate: new Date() });
    const pId = resProj.body.project.projectID;

    
    const resComment = await request(app).post(`/api/project/${pId}/comments`)
      .set('Authorization', `Bearer ${tokenUser1}`)
      .send({ content: 'Meu comentário' });
    const cId = resComment.body.commentID;

    const response = await request(app)
        .delete(`/api/project/${cId}/deletecomment`)
        .set('Authorization', `Bearer ${tokenUser2}`);

    expect(response.status).not.toBe(200);
  });

  it('deve retornar 404 ao buscar projeto inexistente', async () => {
    const response = await request(app)
      .get('/api/projects/999999') 
      .set('Authorization', `Bearer ${tokenUser1}`);
      
    expect(response.status).toBe(404);
  });

  describe('GET /api/projects/:projectId', () => {
    it('deve retornar um projeto específico com seus detalhes e tecnologias', async () => {
      const createRes = await request(app).post('/api/user/newproject')
        .set('Authorization', `Bearer ${tokenUser1}`)
        .send({
          title: 'Projeto Detalhado',
          description: 'Desc',
          status: 'Aberto',
          startDate: new Date(),
          technologies: ['Node', 'Express']
        });
      const projectId = createRes.body.project.projectID;

      const response = await request(app)
        .get(`/api/projects/${projectId}`)
        .set('Authorization', `Bearer ${tokenUser1}`);

      expect(response.status).toBe(200);
      expect(response.body.title).toBe('Projeto Detalhado');
      expect(response.body.authorUsername).toBe('owner'); 
      expect(response.body.technologies).toContain('Node'); 
      expect(response.body.technologies).toContain('Express');
    });

    it('deve retornar 404 se o projeto não existir', async () => {
      const response = await request(app)
        .get('/api/projects/999999')
        .set('Authorization', `Bearer ${tokenUser1}`);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Projeto não encontrado');
    });
  });

  describe('Comentários em Projetos', () => {
    let projectId: string;

    beforeEach(async () => {
      const res = await request(app).post('/api/user/newproject')
        .set('Authorization', `Bearer ${tokenUser1}`)
        .send({ title: 'Discussão', description: '...', status: 'Aberto', startDate: new Date() });
      projectId = res.body.project.projectID;
    });

    it('deve listar os comentários de um projeto', async () => {
      await request(app).post(`/api/project/${projectId}/comments`)
        .set('Authorization', `Bearer ${tokenUser1}`)
        .send({ content: 'Primeiro!' });

      await request(app).post(`/api/project/${projectId}/comments`)
        .set('Authorization', `Bearer ${tokenUser2}`)
        .send({ content: 'Segundo!' });

      const response = await request(app).get(`/api/project/${projectId}/comments`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(2);
    });

    it('deve deletar um comentário próprio com sucesso', async () => {
      
      const commRes = await request(app).post(`/api/project/${projectId}/comments`)
        .set('Authorization', `Bearer ${tokenUser1}`)
        .send({ content: 'Vou deletar' });
      const commentId = commRes.body.commentID;

      const response = await request(app)
        .delete(`/api/project/${commentId}/deletecomment`)
        .set('Authorization', `Bearer ${tokenUser1}`);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Comentário deletado com sucesso.');

      const comments = await request(app).get(`/api/project/${projectId}/comments`);
      expect(comments.body).toHaveLength(0);
    });

    it('deve listar todos os comentários feitos pelo usuário logado', async () => {
      await request(app).post(`/api/project/${projectId}/comments`)
        .set('Authorization', `Bearer ${tokenUser1}`)
        .send({ content: 'Comentário no Projeto 1' });

      const res2 = await request(app).post('/api/user/newproject')
        .set('Authorization', `Bearer ${tokenUser1}`)
        .send({ title: 'Outro Projeto', description: '...', status: 'Aberto', startDate: new Date() });
      const proj2Id = res2.body.project.projectID;

      await request(app).post(`/api/project/${proj2Id}/comments`)
        .set('Authorization', `Bearer ${tokenUser1}`)
        .send({ content: 'Comentário no Projeto 2' });

      const response = await request(app)
        .get('/api/user/comments')
        .set('Authorization', `Bearer ${tokenUser1}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(2);
      
      
      const titulos = response.body.map((c: any) => c.projectTitle);
      expect(titulos).toContain('Discussão');
      expect(titulos).toContain('Outro Projeto');
    });
  });
});

