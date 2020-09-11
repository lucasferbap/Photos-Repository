/* eslint-disable no-unused-expressions */
import crypto from 'crypto';
import path from 'path';
import fs from 'fs';
import IPathMaker from '../models/IPathMaker';

export default class DiskPathMaker implements IPathMaker {
    public makeName(aliasName: string): string {
        return `${aliasName} - ${crypto
            .randomBytes(10)
            .toString('HEX')} - ${Date.now()}`;
    }

    public makePath(
        createPath: boolean,
        rootFolderName?: string,
        albumName?: string,
        photoName?: string,
    ): string {
        const pathName = path.resolve(
            __dirname,
            '..',
            '..',
            '..',
            '..',
            '..',
            '..',
            'uploads',
            rootFolderName || '',
            albumName || '',
            photoName || '',
        );
        if (createPath) {
            fs.mkdirSync(pathName);
        }
        return pathName;
    }

    public async moveArchive(oldPath: string, newPath: string): Promise<void> {
        fs.rename(oldPath, newPath, error => {
            console.log(error);
        });
    }

    public deleteFolder(pathName: string): void {
        fs.rmdirSync(pathName);
    }

    public deleteFile(pathName: string): void {
        fs.unlinkSync(pathName);
    }
}
