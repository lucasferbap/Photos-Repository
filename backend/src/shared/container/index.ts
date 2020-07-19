import '../../modules/users/providers';

import './providers';
import { container } from 'tsyringe';
import IUsersRepository from '../../modules/users/repositories/IUsersRepository';
import UsersRepository from '../../modules/users/infra/typeorm/repositories/UsersRepositrory';

container.registerSingleton<IUsersRepository>(
    'UsersRepository',
    UsersRepository,
);
