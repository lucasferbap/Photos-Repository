import { Router } from 'express';
import usersRouter from './users routes/users.routes';
import sessionsRouter from './sessions.routes';
import albunsRouter from './album.routes';
import photosRouter from './photos.routes';
import usersAvatarRouter from './users routes/users.avatar.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/users/avatar', usersAvatarRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/albuns', albunsRouter);
routes.use('/photos', photosRouter);

export default routes;
