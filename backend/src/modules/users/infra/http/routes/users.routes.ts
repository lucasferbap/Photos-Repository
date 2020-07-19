import { Router } from 'express';
// import multer from 'multer';

import { Segments, celebrate } from 'celebrate';
import Joi from '@hapi/joi';
// import ensureAuth from '../../../../../shared/infra/http/middlewares/ensureAuthenticated';
// import uploadConfig from '../../../../../config/upload';

import UsersController from '../controllers/UsersControllers';

const usersRouter = Router();
// const upload = multer(uploadConfig.multer);
const usersController = new UsersController();

usersRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        },
    }),
    usersController.create,
);

export default usersRouter;
