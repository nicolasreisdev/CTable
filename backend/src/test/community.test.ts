import request from 'supertest';
import app from '../app';
import knex from '../data';

let tokenAdmin: string; // Criador
let tokenUser: string; // Membro
let user1Id: number;
let user2Id: number;

beforeAll(async () => {
  await knex.migrate.latest();
});

beforeEach(async () => {
  await knex('CommunitiesKeywords').del();
  await knex('CommunityMembers').del();
  await knex('Communities').del();
  await knex('Keywords').del();
  await knex('User').del();

  await knex('Keywords').insert([{ tag: 'Java' }, { tag: 'Python' }]);

  await request(app).post('/api/register').send({
    nomeCompleto: 'Admin Community', username: 'admincomm', email: 'admin@c.com', dataNascimento: '1990/01/01', senha: '123'
  });
  const login1 = await request(app).post('/api/login').send({ username: 'admincomm', senha: '123' });
  tokenAdmin = login1.body.token;
  user1Id = login1.body.user.id;

  await request(app).post('/api/register').send({
    nomeCompleto: 'Member Community', username: 'membercomm', email: 'member@c.com', dataNascimento: '1990/01/01', senha: '123'
  });
  const login2 = await request(app).post('/api/login').send({ username: 'membercomm', senha: '123' });
  tokenUser = login2.body.token;
  user2Id = login2.body.user.id;
});

afterAll(async () => {
  await knex.destroy();
});

describe('Fluxo de Comunidades', () => {

  it('deve criar uma comunidade com sucesso (Status 201)', async () => {
    const response = await request(app)
      .post('/api/newcommunity')
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .send({
        name: 'Comunidade React',
        description: 'Fãs de React',
        technologies: [] 
      });

    expect(response.status).toBe(201);
    expect(response.body.community.name).toBe('Comunidade React');
  });

  it('usuário deve conseguir entrar em uma comunidade (Status 201)', async () => {

    const createRes = await request(app)
      .post('/api/newcommunity')
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .send({ name: 'Join Test', description: 'Desc' });
    
    const communityId = createRes.body.community.communityID;

    const response = await request(app)
      .post(`/api/communities/${communityId}/join`)
      .set('Authorization', `Bearer ${tokenUser}`)
      .send();

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Membro adicionado com sucesso");
  });

  it('deve impedir criar comunidade com nome duplicado', async () => {
    await request(app)
      .post('/api/newcommunity')
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .send({ name: 'Unica', description: 'Desc' });

    const response = await request(app)
      .post('/api/newcommunity')
      .set('Authorization', `Bearer ${tokenUser}`) 
      .send({ name: 'Unica', description: 'Outra Desc' });

    expect(response.status).toBe(400); 
  });

  it('membro deve conseguir sair da comunidade (Status 200)', async () => {

    const createRes = await request(app)
        .post('/api/newcommunity')
        .set('Authorization', `Bearer ${tokenAdmin}`)
        .send({ name: 'Leave Test', description: 'Desc' });
    const commId = createRes.body.community.communityID;

    await request(app).post(`/api/communities/${commId}/join`).set('Authorization', `Bearer ${tokenUser}`);

    const response = await request(app)
        .delete(`/api/user/leavecommunity/${commId}`)
        .set('Authorization', `Bearer ${tokenUser}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toContain("saiu da comunidade");
  });

  it('não deve permitir que o criador saia da comunidade', async () => {
    const createRes = await request(app)
        .post('/api/newcommunity')
        .set('Authorization', `Bearer ${tokenAdmin}`)
        .send({ name: 'Creator Leave', description: 'Desc' });
    const commId = createRes.body.community.communityID;

    const response = await request(app)
        .delete(`/api/user/leavecommunity/${commId}`)
        .set('Authorization', `Bearer ${tokenAdmin}`); 

    expect(response.status).not.toBe(200); 
  });

  it('deve impedir criar comunidade com nome já existente', async () => {
    await request(app).post('/api/newcommunity')
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .send({ name: 'Original', description: 'Desc' });

    const response = await request(app).post('/api/newcommunity')
      .set('Authorization', `Bearer ${tokenUser}`)
      .send({ name: 'Original', description: 'Clone' }); 

    expect(response.status).not.toBe(201);
  });

  it('deve impedir que usuário entre na mesma comunidade duas vezes', async () => {
    const res = await request(app).post('/api/newcommunity')
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .send({ name: 'Hub', description: 'Desc' });
    const cId = res.body.community.communityID;

    // Entra primeira vez
    await request(app).post(`/api/communities/${cId}/join`)
      .set('Authorization', `Bearer ${tokenUser}`);
    
    // Tenta entrar de novo
    const response = await request(app).post(`/api/communities/${cId}/join`)
      .set('Authorization', `Bearer ${tokenUser}`);

    expect(response.status).not.toBe(201);
  });

  it('deve impedir edição de comunidade por não-criador', async () => {
    const res = await request(app).post('/api/newcommunity')
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .send({ name: 'Admin Comm', description: 'Desc' });
    const cId = res.body.community.communityID;

    const response = await request(app)
      .put(`/api/communities/updatecommunity/${cId}`)
      .set('Authorization', `Bearer ${tokenUser}`)
      .send({ name: 'Hacked Name' });

    expect(response.status).not.toBe(200);
  });

  it('deve impedir exclusão de comunidade por não-criador', async () => {
    const res = await request(app).post('/api/newcommunity')
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .send({ name: 'To Delete', description: 'Desc' });
    const cId = res.body.community.communityID;

    const response = await request(app)
      .delete(`/api/communities/deletecommunity/${cId}`)
      .set('Authorization', `Bearer ${tokenUser}`);

    expect(response.status).not.toBe(200);
  });

  it('deve falhar ao tentar sair de comunidade que não participa', async () => {
    const res = await request(app).post('/api/newcommunity')
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .send({ name: 'Solo', description: 'Desc' });
    const cId = res.body.community.communityID;

    const response = await request(app)
      .delete(`/api/user/leavecommunity/${cId}`)
      .set('Authorization', `Bearer ${tokenUser}`); 

    expect(response.status).not.toBe(200);
  });

  it('deve editar os dados de uma comunidade com sucesso (Nome, Descrição e Techs)', async () => {
        const createRes = await request(app).post('/api/newcommunity')
            .set('Authorization', `Bearer ${tokenAdmin}`)
            .send({ name: 'Comunidade Java', description: 'Versão 1', technologies: ['Java'] });
        const commId = createRes.body.community.communityID;

        const response = await request(app)
            .put(`/api/communities/updatecommunity/${commId}`)
            .set('Authorization', `Bearer ${tokenAdmin}`)
            .send({
                name: 'Comunidade Python',
                description: 'Versão 2.0',
                technologies: ['Python'] 
            });

        expect(response.status).toBe(200);
        expect(response.body.community.name).toBe('Comunidade Python');

        const dbComm = await knex('Communities').where('communityID', commId).first();
        expect(dbComm.name).toBe('Comunidade Python');
        expect(dbComm.description).toBe('Versão 2.0');

        const dbKeywords = await knex('CommunitiesKeywords')
            .join('Keywords', 'CommunitiesKeywords.keywordID', 'Keywords.keywordID')
            .where('communityID', commId)
            .select('Keywords.tag');
        
        const tags = dbKeywords.map((k: any) => k.tag);
        expect(tags).toContain('Python');
        expect(tags).not.toContain('Java');
    });

  it('deve buscar uma comunidade específica pelo ID e trazer dados detalhados', async () => {
        const createRes = await request(app).post('/api/newcommunity')
            .set('Authorization', `Bearer ${tokenAdmin}`)
            .send({ name: 'Busca ID', description: 'Detalhes' });
        const commId = createRes.body.community.communityID;

        const response = await request(app)
            .get(`/api/communities/data/${commId}`)
            .set('Authorization', `Bearer ${tokenAdmin}`); 

        expect(response.status).toBe(200);
        
        // Valida estrutura de resposta definida no BusinessLogicCommunity.getCommunityData
        expect(response.body.community).toBeDefined();
        expect(response.body.community.name).toBe('Busca ID');
        expect(response.body.community.isAdmin).toBe(true); // Criador deve ser admin
        expect(response.body.community.isMember).toBe(true); // Criador é membro automático
        expect(response.body).toHaveProperty('posts'); // Array de posts
    });

  it('deve retornar todas as comunidades cadastradas', async () => {
        await request(app).post('/api/newcommunity').set('Authorization', `Bearer ${tokenAdmin}`)
            .send({ name: 'Comm 1', description: 'A' });
        
        await request(app).post('/api/newcommunity').set('Authorization', `Bearer ${tokenAdmin}`)
            .send({ name: 'Comm 2', description: 'B' });

        const response = await request(app).get('/api/communities');

        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThanOrEqual(2);
        
        const nomes = response.body.map((c: any) => c.name);
        expect(nomes).toContain('Comm 1');
        expect(nomes).toContain('Comm 2');
    });

  it('deve retornar erro 404 ao tentar atualizar comunidade inexistente', async () => {
        const response = await request(app)
            .put('/api/communities/updatecommunity/999999-inexistente')
            .set('Authorization', `Bearer ${tokenAdmin}`)
            .send({ name: 'Fantasma' });

        expect(response.status).not.toBe(200); 
    });
});

