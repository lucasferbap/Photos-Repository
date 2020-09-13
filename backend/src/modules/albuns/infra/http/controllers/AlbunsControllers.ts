import { Response, Request } from 'express';
import { container } from 'tsyringe';
import CreateAlbumService from '../../../services/CreateAlbumService';
import ListAllUserAlbunsService from '../../../services/LIstAllUserAlbunsService';
import DeleteAlbumService from '../../../services/DeleteAbumService';
import ListAlbumService from '../../../services/ListAlbumService';

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

    public async getOne(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { albumId } = request.params;
        const albumService = container.resolve(ListAlbumService);
        const album = await albumService.execute(albumId);
        return response.json(album);
    }

    public async delete(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id } = request.params;
        const { filePath } = request.body;
        const albumService = container.resolve(DeleteAlbumService);
        await albumService.execute(id, filePath);
        return response.status(204).json();
    }
}
