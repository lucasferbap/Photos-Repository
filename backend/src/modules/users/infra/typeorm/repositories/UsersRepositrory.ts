import { getRepository, Repository } from 'typeorm';
import User from '../entities/User';
import IUserRepository from '../../../repositories/IUsersRepository';
import ICreateUsersDTO from '../../../dtos/ICreateUsersDTO';
import Rootfolder from '../entities/RootFolder';
import rootFolderConfig from '../../../../../config/root_folder';

class UsersRepository implements IUserRepository {
    private ormRepository: Repository<User>;

    constructor() {
        this.ormRepository = getRepository(User);
    }

    public async create({
        name,
        email,
        password,
    }: ICreateUsersDTO): Promise<User> {
        const rootFolder = new Rootfolder();
        const rootFolderData = await rootFolderConfig(
            name,
            `Pasta de fotos de ${name}`,
        );
        rootFolder.path_name = rootFolderData.path_name;
        rootFolder.folder_name = rootFolderData.folder_name;
        rootFolder.alias_name = rootFolderData.alias_name;

        const user = this.ormRepository.create({
            name,
            email,
            password,
            rootFolder,
        });

        this.ormRepository.save(user);

        return user;
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        return this.ormRepository.findOne({ where: { email } });
    }
}

export default UsersRepository;
