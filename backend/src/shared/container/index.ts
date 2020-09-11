import '../../modules/users/providers';

import './providers';
import { container } from 'tsyringe';
import IUsersRepository from '../../modules/users/repositories/IUsersRepository';
import UsersRepository from '../../modules/users/infra/typeorm/repositories/UsersRepositrory';
import IAlbunsRepository from '../../modules/albuns/repositories/IAlbunsRepository';
import AlbunsRepository from '../../modules/albuns/infra/typeorm/repositories/AlbunsRepository';
import IPhotosRepository from '../../modules/photos/repositories/IPhotosRepository';
import PhotosRepository from '../../modules/photos/infra/typeorm/repositories/PhotosRepositrory';

container.registerSingleton<IUsersRepository>(
    'UsersRepository',
    UsersRepository,
);

container.registerSingleton<IAlbunsRepository>(
    'AlbunsRepository',
    AlbunsRepository,
);

container.registerSingleton<IPhotosRepository>(
    'PhotosRepository',
    PhotosRepository,
);
