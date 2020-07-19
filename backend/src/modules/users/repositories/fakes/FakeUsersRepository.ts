import { uuid } from 'uuidv4';
import User from '../../infra/typeorm/entities/User';
import IUsersRepository from '../IUsersRepository';
import ICreateUsersDTO from '../../dtos/ICreateUsersDTO';
import Rootfolder from '../../infra/typeorm/entities/RootFolder';

class FakeUsersRepository implements IUsersRepository {
    private users: User[] = [];

    public async create({
        name,
        email,
        password,
    }: ICreateUsersDTO): Promise<User> {
        const user = new User();
        const rootFolder = new Rootfolder(name);

        Object.assign(rootFolder, { id: uuid(), name });

        Object.assign(user, {
            id: uuid(),
            name,
            email,
            password,
            rootFolder,
        });
        this.users.push(user);
        return user;
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        const user = this.users.find(findUser => findUser.email === email);
        return user;
    }
}

export default FakeUsersRepository;
