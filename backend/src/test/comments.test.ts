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
