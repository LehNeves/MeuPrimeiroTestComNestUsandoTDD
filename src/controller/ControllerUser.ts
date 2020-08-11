import { Request, Response } from "express";
import { index, create, update, del } from "../services/UserService";

class ControllerUser {
	async index (req: Request, res: Response) {
		return await index(req, res);
	}

	async create (req: Request, res : Response) {
		return await create(req, res);
	}

	async update (req: Request, res : Response) {
		return await update(req, res);
	}

	async del (req: Request, res : Response) {
		return await del(req, res);
	}
}

export default ControllerUser;