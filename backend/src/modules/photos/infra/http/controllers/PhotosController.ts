import { Response, Request } from 'express';
import { container } from 'tsyringe';
// import path from 'path';
import CreatePhotoService from '../../../services/CreatePhotoService';
import FindPhotosService from '../../../services/FindPhotosService';
import DeletePhotoService from '../../../services/DeletePhotoService';

export default class PhotosController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id } = request.user;
        const createPhotoService = container.resolve(CreatePhotoService);
        const photos = await createPhotoService.execute({
            userId: id,
            photos: request.files,
            rootFolderName: request.body.rootFolderName,
            albumName: request.body.albumName,
        });
        return response.status(201).json(photos);
    }

    public async findAllFromUsersAlbuns(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id } = request.user;
        const { rootFolder, albumName } = request.query;
        const findPhotosService = container.resolve(FindPhotosService);
        const photos = await findPhotosService.execute(
            id,
            rootFolder as string,
            albumName as string,
        );
        return response.status(200).json(photos);
    }

    public async delete(
        request: Request,
        response: Response,
    ): Promise<Response> {
        console.log('entrou');
        const { id } = request.params;
        const { pathName } = request.body;
        const deletePhotoService = container.resolve(DeletePhotoService);
        const photos = await deletePhotoService.execute(id, pathName);
        return response.status(200).json(photos);
    }
}
