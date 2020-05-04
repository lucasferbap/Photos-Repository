import { EntityRepository, Repository } from 'typeorm';
import RootFolder from '../models/RootFolder';

@EntityRepository(RootFolder)
class RootFolderRepository extends Repository<RootFolder> {
    public async findRoottFolderByUserId(
        userId: string,
    ): Promise<RootFolder | undefined> {
        const rootFolder = this.createQueryBuilder('root_folder')
            .leftJoinAndSelect('root_folder.user', 'user')
            .where('root_folder."userId" = :userId', { userId })
            .getOne();
        return rootFolder;
    }
}

export default RootFolderRepository;
