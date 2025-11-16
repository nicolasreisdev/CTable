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


describe("Criação de projeto", () => {

  describe('POST /api/newproject', () => {

    it("deve obter sucesso na criação do projeto (Status 201)", async () => {

      const newProject = {
        title: 'CTable Ceci',
        description: 'Teste ceci',
        status: 'Andamento',
        startDate: '31/12/2004'
      }

      const response = await request(app)
              .post('/api/newproject')
              .send(newProject);

      expect(response.status).toBe(201);

    })


    it("deve falhar na criação do projeto (Status 401)", async () =>{

    })

  })

describe('GET /api/projects', () =>{

  beforeEach(async () =>{
    const newProject = {
        title: 'CTable Ceci',
        description: 'Teste ceci',
        status: 'Andamento',
        startDate: '31/12/2004'
      }

    const response = await request(app)
              .post('/api/newproject')
              .send(newProject);
  })

  it('deve retornar um map com projetos do usuário', async () =>{
    const response = await request(app).get('api/project');

    expect(response.status).toBe(200);
    
  })

})

})