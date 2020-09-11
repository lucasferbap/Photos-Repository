import { Router } from 'express';

import multer from 'multer';
import ensureAuth from '../../../../../shared/infra/http/middlewares/ensureAuthenticated';
import PhotosController from '../controllers/PhotosController';
import uploadConfig from '../../../../../config/upload';

const photosRouter = Router();
const upload = multer(uploadConfig.multer);
const photosController = new PhotosController();

photosRouter.post(
    '/upload',
    ensureAuth,
    upload.array('photos', 30),
    photosController.create,
);

photosRouter.get('/', ensureAuth, photosController.findAllFromUsersAlbuns);
photosRouter.delete('/:id', ensureAuth, photosController.delete);

export default photosRouter;
