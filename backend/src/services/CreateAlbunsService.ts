import path from 'path';
import fs from 'fs';
import { getRepository, getCustomRepository } from 'typeorm';
import Album from '../models/Album';
import AppError from '../errors/AppError';
import RootFolderRepository from '../repositories/RootFolderRepository';

class CreateAlbunsService {
    public async execute(userId: string, title: string): Promise<Album> {
        const albunsRepository = getRepository(Album);
        const rootFolderRepository = getCustomRepository(RootFolderRepository);

        const rootFolder = await rootFolderRepository.findRoottFolderByUserId(
            userId,
        );

        const albunPath = path.resolve(
            __dirname,
            '..',
            '..',
            'tmp',
            `${rootFolder?.folderName}`,
            `${title}`,
        );

        if (fs.existsSync(albunPath)) {
            throw new AppError(
                'An Albun with this title already exists, try an onther title!',
                400,
            );
        }
        fs.mkdirSync(albunPath);
        const albun = albunsRepository.create({
            title,
            path: albunPath,
            rootFolder,
        });
        await albunsRepository.save(albun);

        return albun;
    }
}

export default CreateAlbunsService;
