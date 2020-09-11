import { Router } from 'express';
import ensureAuth from '../../../../../shared/infra/http/middlewares/ensureAuthenticated';
import serverPhotos from '../middlewares/serverPhotos';

const serverPhotosRouter = Router();

serverPhotosRouter.get('/:userId/:fileName', ensureAuth, serverPhotos);

export default serverPhotosRouter;
