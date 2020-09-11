import { injectable, inject } from 'tsyringe';
import Album from '../infra/typeorm/entities/Album';
// import IUsersRepository from '../../users/repositories/IUsersRepository';
import IAlbunsRepository from '../repositories/IAlbunsRepository';

@injectable()
export default class ListAllUserAlbunsService {
    constructor(
        @inject('AlbunsRepository')
        private albunsRepository: IAlbunsRepository,
    ) {}

    public async execute(userId: string): Promise<Album[] | undefined> {
        return this.albunsRepository.findAllUserAlbunsByUserId(userId);
    }
}
