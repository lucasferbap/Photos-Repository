import { getRepository, Repository } from 'typeorm';
import User from '../entities/User';
import IUserRepository from '../../../repositories/IUsersRepository';
import ICreateUsersDTO from '../../../dtos/ICreateUsersDTO';
import Rootfolder from '../entities/RootFolder';

class UsersRepository implements IUserRepository {
    private ormRepository: Repository<User>;

    constructor() {
        this.ormRepository = getRepository(User);
    }

    public async create({
        name,
        email,
        password,
        rootFolderPathName,
        rootFolderName,
    }: ICreateUsersDTO): Promise<User> {
        const rootFolder = new Rootfolder();
        rootFolder.path_name = rootFolderPathName;
        rootFolder.folder_name = rootFolderName;
        rootFolder.alias_name = `Pasta de fotos de ${name}`;

        const user = this.ormRepository.create({
            name,
            email,
            password,
            avatar_url: 'http://localhost:3333/uploads/defaultAvatar.png',
            rootFolder,
        });

        this.ormRepository.save(user);

        return user;
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        return this.ormRepository.findOne({
            where: { email },
            relations: ['rootFolder'],
        });
    }

    public async findById(id: string): Promise<User | undefined> {
        return this.ormRepository.findOne({
            where: { id },
            relations: ['rootFolder'],
        });
    }
}

export default UsersRepository;
