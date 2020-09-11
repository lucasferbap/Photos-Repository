import { injectable, inject } from 'tsyringe';
import IPathMaker from '../../../shared/container/providers/DiskPathMaker/models/IPathMaker';
import IPhotosRepository from '../repositories/IPhotosRepository';

@injectable()
export default class DeletePhotoService {
    constructor(
        @inject('PhotosRepository')
        private photosRepository: IPhotosRepository,

        @inject('PathMaker')
        private pathMaker: IPathMaker,
    ) {}

    public async execute(photoId: string, pathName: string): Promise<void> {
        this.pathMaker.deleteFile(pathName);
        await this.photosRepository.deletePhotoById(photoId);
    }
}
