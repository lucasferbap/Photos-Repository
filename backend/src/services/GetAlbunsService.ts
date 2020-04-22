import { getCustomRepository } from 'typeorm';
import Album from '../models/Album';
import AlbumRepository from '../repositories/AlbumFolderRepository';

class GetAlbunsService {
    public async execute(
        userId: string,
    ): Promise<[Album[], number] | undefined> {
        const albunsRepository = getCustomRepository(AlbumRepository);
        const albuns = albunsRepository.findAllAlmbunsPerUserId(userId);
        return albuns;
    }
}

export default GetAlbunsService;
