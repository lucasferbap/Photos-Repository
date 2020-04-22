import { Router } from 'express';
// import multer from 'multer';
import CreateUserService from '../services/CreateUserService';
// import ensureAuth from '../middlewares/ensureAuthenticated';
// import uploadConfig from '../config/upload';

const usersRouter = Router();
// const upload = multer(uploadConfig);

// cria um novo usuario
usersRouter.post('/', async (request, response) => {
    const { name, email, password } = request.body;
    const user = await new CreateUserService().execute({
        name,
        email,
        password,
    });
    delete user.password;
    return response.status(201).json(user);
});

export default usersRouter;
