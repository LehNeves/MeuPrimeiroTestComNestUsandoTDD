import Router from 'express';
import ControllerUser from './controller/ControllerUser';

const router = Router();

const controllerUser = new ControllerUser();
router.get('/users', controllerUser.index);
router.post('/users', controllerUser.create);
router.put('/users/:userId', controllerUser.update);
router.delete('/users/:userId', controllerUser.del);

export default router;