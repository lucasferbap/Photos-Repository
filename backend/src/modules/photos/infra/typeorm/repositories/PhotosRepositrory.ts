import { getRepository, Repository } from 'typeorm';
import IPhotosRepository from '../../../repositories/IPhotosRepository';
import Photo from '../entities/Photos';
import Rootfolder from '../../../../users/infra/typeorm/entities/RootFolder';
import User from '../../../../users/infra/typeorm/entities/User';
import Album from '../../../../albuns/infra/typeorm/entities/Album';

class PhotosRepository implements IPhotosRepository {
    private ormRepository: Repository<Photo>;

    constructor() {
        this.ormRepository = getRepository(Photo);
    }

    public async deletePhotoById(id: string): Promise<void> {
        this.ormRepository.delete({ id });
    }

    public async findAllPhotosFromUsersAlbuns(
        userId: string,
        rootFolderName: string,
        albumName: string,
    ): Promise<Photo[]> {
        let photos: Photo[] = [];

        // Recuperando todas as fotos de um usuário de um album específico
        if (albumName) {
            photos = await this.ormRepository
                .createQueryBuilder()
                .select('p')
                .from(Photo, 'p')
                .innerJoin(Album, 'album', 'album.id = p."albumId"')
                .innerJoin(Rootfolder, 'rf', 'rf.id = album."rootFolderId"')
                .innerJoin(User, 'usr', 'usr."rootFolderId" = rf.id')
                .where('album.album_name = :albumName', { albumName })
                .andWhere('usr.id = :userId', { userId })
                .getMany();
        } else {
            // Recuperando todas as fotos de um usuário da pasta raíz
            photos = await this.ormRepository
                .createQueryBuilder()
                .select('p')
                .from(Photo, 'p')
                .innerJoin(Rootfolder, 'rf', 'rf.id = p."rootFolderId"')
                .innerJoin(User, 'usr', 'usr."rootFolderId" = rf.id')
                .where('usr.id = :userId', { userId })
                .getMany();
        }

        return photos;
    }

    public async create(photo: Photo): Promise<Photo> {
        const newPhoto = this.ormRepository.create(photo);
        await this.ormRepository.save(newPhoto);
        return photo;
    }
}

export default PhotosRepository;
