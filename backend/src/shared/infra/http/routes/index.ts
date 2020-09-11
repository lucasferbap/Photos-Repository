import { Router } from 'express';
// import appoitmentRouter from '../../../../modules/appointments/infra/http/routes/appoitment.routes';
// import providersRouter from '../../../../modules/appointments/infra/http/routes/providers.routes';
import usersRouter from '../../../../modules/users/infra/http/routes/users.routes';
import sessionsRouter from '../../../../modules/users/infra/http/routes/sessions.routes';
import albunsRouter from '../../../../modules/albuns/infra/http/routes/albuns.routes';
import photosRouter from '../../../../modules/photos/infra/http/routes/uploadPhotos.routes';
import serverPhotosRouter from '../../../../modules/photos/infra/http/routes/serverPhotos.routes';
// import passwordRouter from '../../../../modules/users/infra/http/routes/password.routes';
// import profileRouter from '../../../../modules/users/infra/http/routes/profile.routes';

const routes = Router();

// routes.use('/providers', providersRouter);
routes.use('/photos/user', serverPhotosRouter);
routes.use('/photos', photosRouter);
routes.use('/albuns', albunsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
