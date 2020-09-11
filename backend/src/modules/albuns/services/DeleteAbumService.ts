import { injectable, inject } from 'tsyringe';
import IAlbunsRepository from '../repositories/IAlbunsRepository';
import IPathMaker from '../../../shared/container/providers/DiskPathMaker/models/IPathMaker';

@injectable()
export default class DeleteAlbumService {
    constructor(
        @inject('AlbunsRepository')
        private albunsRepository: IAlbunsRepository,

        @inject('PathMaker')
        private pathMaker: IPathMaker,
    ) {}

    public async execute(albumId: string, pathName: string): Promise<void> {
        this.pathMaker.deleteFolder(pathName);
        await this.albunsRepository.deleteAlbumById(albumId);
    }
}
