import { inject, injectable } from 'tsyringe';
import IAlbunsRepository from '../repositories/IAlbunsRepository';
import Album from '../infra/typeorm/entities/Album';

@injectable()
export default class ListAlbumService {
    constructor(
        @inject('AlbunsRepository')
        private albunsRepository: IAlbunsRepository,
    ) {}

    public async execute(albumId: string): Promise<Album | undefined> {
        const album = await this.albunsRepository.findById(albumId);
        return album;
    }
}
