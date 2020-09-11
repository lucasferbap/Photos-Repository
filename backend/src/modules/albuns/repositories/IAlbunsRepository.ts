import Album from '../infra/typeorm/entities/Album';
import ICreateAlbumDTO from '../dtos/ICreateAlbumDTO';

export default interface IAlbunsRepository {
    create(data: ICreateAlbumDTO): Promise<Album>;
    findByAliasName(
        aliasName: string,
        userId: string,
    ): Promise<Album | undefined>;
    findAllUserAlbunsByUserId(userId: string): Promise<Album[] | undefined>;
    findByAlbumName(albumName: string): Promise<Album | undefined>;
    deleteAlbumById(albumId: string): Promise<void>;
}
