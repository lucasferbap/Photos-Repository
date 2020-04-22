import { Router } from 'express';
import multer from 'multer';
import ensureAuth from '../middlewares/ensureAuthenticated';
import uploadConfig from '../config/upload';
import SavePhotosService from '../services/SavePhotosService';
import DeletePhotoService from '../services/DeletePhotoService';

const photosRouter = Router();
const upload = multer(uploadConfig);

photosRouter.post(
    '/',
    ensureAuth,
    upload.array('photos', 12),
    async (request, response) => {
        const userId = request.user.id;
        const { title, albumName } = request.body;
        const { files } = request;
        const album = await new SavePhotosService().execute({
            albumName,
            files,
            title,
            userId,
        });
        return response.json(album);
    },

    photosRouter.delete('/:id', ensureAuth, async (request, response) => {
        const { id } = request.params;
        await new DeletePhotoService().execute(id);
        return response.status(204).send();
    }),
);

export default photosRouter;
