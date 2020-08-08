import { Response, Request } from 'express';
import { container } from 'tsyringe';
import CreateAlbumService from '../../../services/CreateAlbumService';
import ListAllUserAlbunsService from '../../../services/LIstAllUserAlbunsService';

export default class AlbunsController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { aliasName } = request.body;
        const { id } = request.user;
        const albumService = container.resolve(CreateAlbumService);
        const album = await albumService.execute(aliasName, id);
        return response.json(album);
    }

    public async listAll(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id } = request.user;
        const albumService = container.resolve(ListAllUserAlbunsService);
        const albuns = await albumService.execute(id);
        return response.json(albuns);
    }
}
