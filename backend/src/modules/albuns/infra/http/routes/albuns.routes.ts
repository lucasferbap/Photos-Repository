import { Router } from 'express';

import ensureAuth from '../../../../../shared/infra/http/middlewares/ensureAuthenticated';

import AlbunsController from '../controllers/AlbunsControllers';

const usersRouter = Router();
const albunsController = new AlbunsController();

usersRouter.post('/', ensureAuth, albunsController.create);
usersRouter.get('/', ensureAuth, albunsController.listAll);
usersRouter.delete('/:id', ensureAuth, albunsController.delete);

export default usersRouter;
