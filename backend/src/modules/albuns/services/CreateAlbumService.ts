import { injectable, inject } from 'tsyringe';
import Album from '../infra/typeorm/entities/Album';
import IAlbunsRepository from '../repositories/IAlbunsRepository';
import AppError from '../../../shared/errors/AppError';
import IPathMaker from '../../../shared/container/providers/DiskPathMaker/models/IPathMaker';
import IUsersRepository from '../../users/repositories/IUsersRepository';

@injectable()
export default class CreateAlbumService {
    constructor(
        @inject('AlbunsRepository')
        private albunsRepository: IAlbunsRepository,

        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('PathMaker')
        private pathMaker: IPathMaker,
    ) {}

    public async execute(aliasName: string, userId: string): Promise<Album> {
        const user = await this.usersRepository.findById(userId);

        if (!user) {
            throw new AppError('User does not exists');
        }

        if (await this.albunsRepository.findByAliasName(aliasName, userId)) {
            throw new AppError('An album with this name already exists');
        }
        // Montar o albumName
        const albumName = this.pathMaker.makeName(aliasName);

        // Montar o PathName
        const pathName = await this.pathMaker.makePath(
            user?.rootFolder.folder_name,
            albumName,
        );

        const album = await this.albunsRepository.create({
            aliasName,
            album_name: albumName,
            path_name: pathName,
            rootFolder: user?.rootFolder,
        });

        return album;
    }
}
