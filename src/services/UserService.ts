import db from "../database/connection";
import { Response, Request, request } from "express";

async function index(req: Request, res : Response) {
	const result = await db('users');

	return res.status(200).send(result);
}

async function create(req : Request, res : Response) {
	const {
		email,
		name,
		username,
		password
	} = req.body;
	
	if (!email || !name || !username || !password)
		return res.status(400).send("Missing fields");

	const alreadyExist = await db('users').where('email', '=', email);

	if(alreadyExist.length !== 0)
		return res.status(400).send("Email already exist");

	await db('users').insert({
		name,
		username,
		password,
		email
	});

	return res.status(201).send("User has been created with success");
}

async function update(req : Request, res : Response) {
	const {
		email,
		name,
		username,
		password
	} = req.body;

	const id = req.params['userId'];

	if (!id || !email || !name || !username || !password)
		return res.status(400).send("Missing fields");

	let user = await db('users').where('id', '=', id);

	if (user.length === 0)
		return res.status(400).send("User not found");
	user = user[0];

	await db('users').where('id', '=', id).update({
		name,
		username,
		password,
		email
	});

	db

	return res.status(200).send("User has been altered with success");
}

async function del(req : Request, res : Response) {
	const id = req.params['userId'];

	if (!id)
		return res.status(400).send("Missing fields");

	let user = await db('users').where('id', '=', id);


	if (user.length === 0)
		return res.status(400).send("User not found");


	await db('users').where('id', '=', id).delete();

	return res.status(200).send("User has been altered with success");
}

export {index, create, update, del};