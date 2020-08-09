import Router from 'express';

const router = Router();

router.post('/helloworld', (request, response) => {
	return response.status(200).send(
		{'helloworld' : 'Hello Word.'}
	);
});

export default router;