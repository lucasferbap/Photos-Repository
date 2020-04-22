import { Router } from 'express';
import usersRouter from './users.routes';
import sessionsRouter from './sessions.routes';
import albunsRouter from './album.routes';
import photosRouter from './photos.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/albuns', albunsRouter);
routes.use('/photos', photosRouter);

export default routes;
