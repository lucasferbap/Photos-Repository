import path from 'path';
import crypto from 'crypto';
import fs from 'fs';
import { getRepository } from 'typeorm';
import RootFolder from '../models/RootFolder';
import User from '../models/User';

class CreateUserRootFolderService {
    public async execute(userName: string, user: User): Promise<RootFolder> {
        const rootFolderRepository = getRepository(RootFolder);
        const folderHash = crypto.randomBytes(10).toString('HEX');
        const folderName = `${userName}-${folderHash}`;
        const folderPath = path.resolve(
            __dirname,
            '..',
            '..',
            'tmp',
            `${folderName}`,
        );
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath);
        }
        const rootFolder = rootFolderRepository.create({
            folderName,
            path: folderPath,
            user,
        });
        await rootFolderRepository.save(rootFolder);

        return rootFolder;
    }
}

export default CreateUserRootFolderService;
