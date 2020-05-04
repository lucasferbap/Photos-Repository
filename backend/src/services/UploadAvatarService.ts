import { getCustomRepository, getRepository } from 'typeorm';
import fs from 'fs';
import RootFolderRepository from '../repositories/RootFolderRepository';
import User from '../models/User';
import AppError from '../errors/AppError';

class UploadAvatarService {
    public async execute(
        userId: string,
        avatarFile: Express.Multer.File,
    ): Promise<User> {
        const userRepository = getRepository(User);
        const rootFolderRepository = getCustomRepository(RootFolderRepository);
        const userRootFolder = await rootFolderRepository.findRoottFolderByUserId(
            userId,
        );

        const avatarNewPath = `${userRootFolder?.path}\\${userRootFolder?.user.name}-avatar-folder\\${avatarFile.filename}`;

        fs.readdir(
            `${userRootFolder?.path}\\${userRootFolder?.user.name}-avatar-folder`,
            (err, files) => {
                if (files.length === 0) {
                    fs.rename(avatarFile.path, avatarNewPath, error => {
                        if (error) {
                            throw error;
                        } else {
                            console.log('Successfully moved the file!');
                        }
                    });
                } else {
                    fs.unlinkSync(avatarFile.path);
                    throw new AppError(
                        'Incorrect email/password combination',
                        401,
                    );
                }
            },
        );

        userRootFolder?.user.avatar = avatarNewPath;

        userRepository.save(userRootFolder?.user);

        return userRootFolder?.user;
    }
}

export default UploadAvatarService;
