import { injectable, inject } from 'tsyringe';
import IPhotosRepository from '../repositories/IPhotosRepository';
import Photo from '../infra/typeorm/entities/Photos';

@injectable()
export default class FindPhotosService {
    constructor(
        @inject('PhotosRepository')
        private photosRepository: IPhotosRepository,
    ) {}

    public async execute(
        userId: string,
        rootFolderName: string,
        albumName?: string,
    ): Promise<Photo[]> {
        const photos = await this.photosRepository.findAllPhotosFromUsersAlbuns(
            userId,
            rootFolderName,
            albumName,
        );

        return photos;
    }
}
