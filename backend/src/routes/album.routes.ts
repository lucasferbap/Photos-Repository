import { Router } from 'express';

import ensureAuth from '../middlewares/ensureAuthenticated';
import CreateAlbunsService from '../services/CreateAlbunsService';
import GetAlbunsService from '../services/GetAlbunsService';
import DeleteAlbumService from '../services/DeleteAlbumService';

const albunsRouter = Router();

// cria um novo album na pasta do usuario autenticado
albunsRouter.post('/', ensureAuth, async (request, response) => {
    const { title } = request.body;
    const { id } = request.user;
    const albun = await new CreateAlbunsService().execute(id, title);
    return response.json(albun);
});

// lista todos os albuns do usuario autenticado
albunsRouter.get('/', ensureAuth, async (request, response) => {
    const { id: userId } = request.user;
    // quero devolver todos os albuns a partir do id do usuario
    const albuns = await new GetAlbunsService().execute(userId);
    return response.json(albuns);
});

albunsRouter.delete('/:id', ensureAuth, async (request, response) => {
    const { id } = request.params;
    await new DeleteAlbumService().execute(id);
    return response.status(204).send();
});

export default albunsRouter;
