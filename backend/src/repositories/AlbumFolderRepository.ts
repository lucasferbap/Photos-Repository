import { EntityRepository, Repository, getConnection } from 'typeorm';
import Album from '../models/Album';
import RootFolder from '../models/RootFolder';
import User from '../models/User';
import AppError from '../errors/AppError';

@EntityRepository(Album)
class AlbumRepository extends Repository<Album> {
    public async findAllAlmbunsPerUserId(
        userId: string,
    ): Promise<[Album[], number] | undefined> {
        const albuns = await getConnection()
            .createQueryBuilder()
            .select('album')
            .from(Album, 'album')
            .innerJoin(RootFolder, 'rf', 'rf.id = album."rootFolderId"')
            .innerJoin(User, 'usr', 'usr.id = rf."userId"')
            .leftJoinAndSelect('album.photos', 'photos')
            .where('rf."userId" = :userId', { userId })
            .getManyAndCount();
        return albuns;
    }

    public async findAlbumPerTitleAndUserId(
        userId: string,
        albumTitle: string,
    ): Promise<Album | undefined> {
        try {
            const album = await getConnection()
                .createQueryBuilder()
                .select('album')
                .from(Album, 'album')
                .innerJoin(RootFolder, 'rf', 'album."rootFolderId" = rf.id')
                .where('rf."userId" = :userId', { userId })
                .andWhere('album.title = :albumTitle', { albumTitle })
                .getOne();
            return album;
        } catch (error) {
            throw new AppError(error);
        }
    }

    public async findAlbumWithAllPhotos(
        title: string,
    ): Promise<Album | undefined> {
        try {
            const album = await getConnection()
                .createQueryBuilder()
                .select('album')
                .from(Album, 'album')
                .leftJoinAndSelect('album.photos', 'photos')
                .where('album.title = :title', { title })
                .getOne();
            return album;
        } catch (error) {
            throw new AppError(error);
        }
    }
}
export default AlbumRepository;
