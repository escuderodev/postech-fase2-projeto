import request from 'supertest';
import { App } from "../src/server"

const { setup, teardown } = require('../src/test/setup.js');

// Setup and Teardown
beforeAll(async () => {
    await setup();
});
  
afterAll(async () => {
    await teardown();
});

const app = new App().getServer()

// Test GetAll
describe('===Testando o metodo GetAll ===', () => {
  it('deve retornar status 200 se devolver a lista de disciplinas', async () => {
    const response = await request(app).get('/disciplinies');
    expect(response.status).toBe(200);
  });
  it('deve retornar status 404 para rota inexistente', async () => {
    const response = await request(app).get('/rota-inexistente');
    expect(response.status).toBe(404);
  });
});

// Test Post
describe('===Testando o metodo Post ===', () => {
  it('deve retornar status 401 se não informado o token', async () => {
    const object = {
      title: "Teste Post"
    }
    console.log(object)
    const response = (await request(app).post('/disciplinies').send(object));
    console.log(response.body)
    expect(response.status).toBe(401);
  });
});

// Test Put
describe('===Testando o metodo Put ===', () => {
  it('deve retornar status 401 se não informado o token', async () => {
    const response = (await request(app).put('/disciplinies/1').send({
      title: "Teste de inserção de disciplina"
    }));
    expect(response.status).toBe(401);
  });
});

// Test Delete
describe('===Testando o metodo Delete ===', () => {
  it('deve retornar status 401 se não informado o token', async () => {
    const response = (await request(app).delete('/disciplinies/1'));
    expect(response.status).toBe(401);
  });
});