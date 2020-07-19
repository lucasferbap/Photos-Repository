import User from '../infra/typeorm/entities/User';
import ICreateUsersDTO from '../dtos/ICreateUsersDTO';

export default interface IUsersRepository {
    create(userData: ICreateUsersDTO): Promise<User>;
    findByEmail(email: string): Promise<User | undefined>;
}
