import Photo from '../infra/typeorm/entities/Photos';

export default interface IPhotosRepository {
    deletePhotoById(id: string): Promise<void>;
    findAllPhotosFromUsersAlbuns(
        userId: string,
        rootFolderName: string,
        albumName?: string,
    ): Promise<Photo[]>;
    create(photo: Photo): Promise<Photo>;
}
