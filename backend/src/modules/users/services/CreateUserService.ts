import { injectable, inject } from 'tsyringe';
import User from '../infra/typeorm/entities/User';
import AppError from '../../../shared/errors/AppError';
import IUserRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IPathMaker from '../../../shared/container/providers/DiskPathMaker/models/IPathMaker';

interface IRequest {
    name: string;
    email: string;
    password: string;
}

@injectable()
class CreateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUserRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,

        @inject('PathMaker')
        private pathMaker: IPathMaker,
    ) {}

    public async execute({ name, email, password }: IRequest): Promise<User> {
        if (await this.usersRepository.findByEmail(email)) {
            throw new AppError('Email address already used');
        }
        const rootFolderName = this.pathMaker.makeName(name);
        const rootFolderPathName = await this.pathMaker.makePath(
            rootFolderName,
        );

        const hashedPassword = await this.hashProvider.generateHash(password);
        const user = await this.usersRepository.create({
            name,
            email,
            password: hashedPassword,
            rootFolderName,
            rootFolderPathName,
        });
        console.log(user);

        return user;
    }
}

export default CreateUserService;
