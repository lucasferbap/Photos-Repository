import { getRepository, Repository } from 'typeorm';
import Album from '../entities/Album';
import IAlbumRepository from '../../../repositories/IAlbunsRepository';
import ICreateAlbumDTO from '../../../dtos/ICreateAlbumDTO';
import Rootfolder from '../../../../users/infra/typeorm/entities/RootFolder';
import User from '../../../../users/infra/typeorm/entities/User';

class AlbunsRepository implements IAlbumRepository {
    private ormRepository: Repository<Album>;

    constructor() {
        this.ormRepository = getRepository(Album);
    }

    public async deleteAlbumById(albumId: string): Promise<void> {
        await this.ormRepository.delete({ id: albumId });
    }

    public async findByAlbumName(
        albumName: string,
    ): Promise<Album | undefined> {
        const album = await this.ormRepository.findOne({
            where: {
                album_name: albumName,
            },
        });

        return album;
    }

    public async create({
        aliasName,
        rootFolder,
        album_name,
        path_name,
    }: ICreateAlbumDTO): Promise<Album> {
        // receceber - aliasName, rootFolderId, albumName, pathName

        const album = this.ormRepository.create({
            alias_name: aliasName,
            rootFolder,
            album_name,
            path_name,
        });

        await this.ormRepository.save(album);

        return album;
    }

    public async findByAliasName(
        aliasName: string,
        userId: string,
    ): Promise<Album | undefined> {
        const album = await this.ormRepository
            .createQueryBuilder()
            .select('album')
            .from(Album, 'album')
            .innerJoin(Rootfolder, 'rf', 'rf.id = album."rootFolderId"')
            .innerJoin(User, 'usr', 'usr."rootFolderId" = rf.id')
            .where('album.alias_name = :aliasName', { aliasName })
            .andWhere('usr.id = :userId', { userId })
            .getOne();
        return album;
    }

    public async findAllUserAlbunsByUserId(
        userId: string,
    ): Promise<Album[] | undefined> {
        const albuns = await this.ormRepository
            .createQueryBuilder()
            .select('album')
            .from(Album, 'album')
            .innerJoin(Rootfolder, 'rf', 'rf.id = album."rootFolderId"')
            .innerJoin(User, 'usr', 'usr."rootFolderId" = rf.id')
            .andWhere('usr.id = :userId', { userId })
            .getMany();

        return albuns;
    }
}

export default AlbunsRepository;
