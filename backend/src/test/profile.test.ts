import request from 'supertest';
import app from '../app';
import knex from '../data';

let token: string;
let userId: number;

beforeAll(async () => {
  await knex.migrate.latest();
});

beforeEach(async () => {
  await knex('User').truncate();

  await request(app).post('/api/register').send({
    nomeCompleto: 'Profile Test',
    username: 'ptest',
    email: 'profile@test.com',
    dataNascimento: '1995/05/05',
    senha: 'oldPassword'
  });

  const resLogin = await request(app).post('/api/login').send({
    username: 'ptest',
    senha: 'oldPassword'
  });

  token = resLogin.body.token;
  userId = resLogin.body.user.id;
});

afterAll(async () => {
  await knex.destroy();
});

describe('Fluxo de Perfil de Usuário', () => {

  it('deve atualizar dados do perfil (Status 200)', async () => {
    const response = await request(app)
      .put('/api/user/editprofile')
      .set('Authorization', `Bearer ${token}`)
      .send({
        nomeCompleto: 'Nome Atualizado',
        telefone: '99999999'
      });

    expect(response.status).toBe(200);
    expect(response.body.fullName).toBe('Nome Atualizado');

    const userDb = await knex('User').where({ id: userId }).first();
    expect(userDb.fullName).toBe('Nome Atualizado');
  });

  it('deve retornar dados da home do usuário (Status 200)', async () => {
    const response = await request(app)
      .get('/api/user/home')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('communities');
    expect(response.body).toHaveProperty('feed');
  });

  it('deve deletar o perfil do usuário (Status 200)', async () => {
    const response = await request(app)
      .delete('/api/user/deleteprofile')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Perfil deletado com sucesso.");

    const userDb = await knex('User').where({ id: userId }).first();
    expect(userDb).toBeUndefined();
  });

  it('deve falhar ao tentar atualizar perfil sem enviar dados', async () => {
    const response = await request(app)
        .put('/api/user/editprofile')
        .set('Authorization', `Bearer ${token}`)
        .send({}); 

    
    expect(response.status).not.toBe(200);
  });
});

