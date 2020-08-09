import request from 'supertest';
import app from '../../src/app';

describe("Hello World", () => {
	it('Quando eu bater na rota helloworld ela deve me retornar um status 200', async () => {
		const result = await request(app).post("/helloworld");

		console.log(result.status);

		expect(result.status).toBe(200)
	});
});