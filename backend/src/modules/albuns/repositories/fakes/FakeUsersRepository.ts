import IAlbunsRepository from '../IAlbunsRepository';
import Album from '../../infra/typeorm/entities/Album';

class FakeUsersRepository implements IAlbunsRepository {
    private albuns: Album[] = [];

    create(): Promise<Album> {
        const album = new Album();
    }
}

export default FakeUsersRepository;
