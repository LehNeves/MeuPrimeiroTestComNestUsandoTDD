import request from 'supertest';
import app from '../../src/app';
import db from '../../src/database/connection';

describe("CRUD Users", () => {
	beforeAll(async () => {
		await db('users').truncate();
	});

	afterAll(async () => {
		await db('users').truncate();
		await db.destroy();
	});

	it('Should be returned status 400 at /users method post, data not send', async () => {
		const result = await request(app).post("/users").send();

		expect(result.status).toEqual(400);
	});

	it('Should be returned status 201 at /users method post, user created', async () => {
		const result = await request(app)
			.post("/users").send({
				"name" : "Leandro", 
				"email" : "lneves997@gmail.com", 
				"username" : "LehNeves", 
				"password" : "19121998"
			});

		expect(result.status).toBe(201);
	});

	it('Should be returned status 200 at /users method get, returnin all users', async () => {
		const result = await request(app).get('/users');

		expect(result.status).toBe(200);
	});

	it('Should be returned status 400 at /users method post, user already exist', async () => {
		const result = await request(app)
			.post("/users").send({
				"name" : "Leandro", 
				"email" : "lneves997@gmail.com", 
				"username" : "LehNeves", 
				"password" : "19121998"
			});

		expect(result.status).toBe(400);
	});

	it('Should be returned status 200 at /users method put, alter email return 200', async () => {
		const result = await request(app)
			.put("/users/1").send({
				"name" : "Leandro", 
				"email" : "leandro-nt@gmail.com", 
				"username" : "LehNeves", 
				"password" : "19121998"
			});

		expect(result.status).toBe(200);
	});

	it('Should be returned status 400 at /users method put, user not exist', async () => {
		const result = await request(app)
			.put("/users/34").send({
				"name" : "Leandro", 
				"email" : "leandro-nt@gmail.com", 
				"username" : "LehNeves", 
				"password" : "1912199"
		});

		expect(result.status).toBe(400);
	});

	it('Should be returned status 404 at /users method put, rout not found', async () => {
		const result = await request(app)
			.put("/users/").send({
				"name" : "Leandro", 
				"email" : "leandro-nt@gmail.com", 
				"username" : "LehNeves", 
				"password" : "19121998"
			});

		expect(result.status).toBe(404);
	});

	it('Should be returned status 404 at /users method delete, rout not found', async () => {
		const result = await request(app)
			.put("/users/").send();

		expect(result.status).toBe(404);
	});

	it('Should be returned status 200 at /users method delete', async () => {
		const result = await request(app)
			.delete("/users/1").send();

		expect(result.status).toBe(200);
	});
});