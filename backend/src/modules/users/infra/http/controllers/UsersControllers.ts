import { Response, Request } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import CreateUserService from '../../../services/CreateUserService';

export default class UsersController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { name, email, password } = request.body;
        const userService = container.resolve(CreateUserService);
        const user = await userService.execute({
            name,
            email,
            password,
        });
        return response.status(201).json({ user: classToClass(user) });
    }
}
