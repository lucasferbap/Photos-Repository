/* eslint-disable no-restricted-syntax */
/* eslint-disable prefer-const */
import { injectable, inject } from 'tsyringe';
import ICreatePhotosDTO from '../dtos/ICreatePhotosDTO';
import Photo from '../infra/typeorm/entities/Photos';
import IPathMaker from '../../../shared/container/providers/DiskPathMaker/models/IPathMaker';
import IAlbunsRepository from '../../albuns/repositories/IAlbunsRepository';
import IPhotosRepository from '../repositories/IPhotosRepository';
import IUsersRepository from '../../users/repositories/IUsersRepository';

@injectable()
export default class CreatePhotoService {
    constructor(
        @inject('UsersRepository')
        private userRepository: IUsersRepository,

        @inject('PathMaker')
        private pathMaker: IPathMaker,

        @inject('AlbunsRepository')
        private albunsRepository: IAlbunsRepository,

        @inject('PhotosRepository')
        private photosRepository: IPhotosRepository,
    ) {}

    public async execute({
        userId,
        photos,
        rootFolderName,
        albumName,
    }: ICreatePhotosDTO): Promise<Photo[]> {
        const uploadedPhotos = photos as Express.Multer.File[];
        let savedPhotos: Photo[] = [];

        for await (const photo of uploadedPhotos) {
            const newPhoto = new Photo();
            newPhoto.alias_name = photo.filename;
            newPhoto.path_name = this.pathMaker.makePath(
                false,
                rootFolderName,
                albumName,
                photo.filename,
            );
            this.pathMaker.moveArchive(photo.path, newPhoto.path_name);
            newPhoto.url = `${process.env.APP_API_URL}/photos/user/${userId}/${
                photo.filename
            }?rootFolder=${rootFolderName}&albumName=${albumName || ''}`;
            if (!albumName) {
                newPhoto.rootFolder = (
                    await this.userRepository.findById(userId)
                )?.rootFolder;
            }

            if (albumName) {
                newPhoto.album = await this.albunsRepository.findByAlbumName(
                    albumName,
                );
            }
            const savedPhoto = await this.photosRepository.create(newPhoto);
            savedPhotos.push(savedPhoto);
        }

        return savedPhotos;
    }
}
