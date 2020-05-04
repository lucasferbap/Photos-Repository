import { Router } from 'express';
import multer from 'multer';
import ensureAuth from '../../middlewares/ensureAuthenticated';
import uploadConfig from '../../config/upload';
import UploadAvatarService from '../../services/UploadAvatarService';

const usersAvatarRouter = Router();
const upload = multer(uploadConfig);

// realiza o upload de um avatar do usuario
usersAvatarRouter.post(
    '/',
    ensureAuth,
    upload.single('avatar'),
    async (request, response) => {
        const userId = request.user.id;
        const userAvatar = request.file;
        const user = new UploadAvatarService().execute(userId, userAvatar);
        return response.json(user);
    },
);

export default usersAvatarRouter;
