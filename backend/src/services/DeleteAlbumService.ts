import { getCustomRepository } from 'typeorm';
import rimraf from 'rimraf';
import AlbumFolderRepository from '../repositories/AlbumFolderRepository';
import AppError from '../errors/AppError';

class DeleteAlbumService {
    public async execute(id: string): Promise<void> {
        try {
            const albumRepository = getCustomRepository(AlbumFolderRepository);
            const album = await albumRepository.findOne({
                where: {
                    id,
                },
            });
            if (!(album === undefined)) {
                rimraf.sync(album?.path);
                await albumRepository.delete({ id });
            }
        } catch (error) {
            throw new AppError(error);
        }
    }
}
export default DeleteAlbumService;
