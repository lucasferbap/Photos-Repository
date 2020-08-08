import crypto from 'crypto';
import path from 'path';
import mkdirp from 'mkdirp';
import IPathMaker from '../models/IPathMaker';

export default class DiskPathMaker implements IPathMaker {
    public makeName(aliasName: string): string {
        return `${aliasName} - ${crypto
            .randomBytes(10)
            .toString('HEX')} - ${Date.now()}`;
    }

    public async makePath(
        rootFolderName?: string,
        albumName?: string,
    ): Promise<string> {
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
        );
        mkdirp(pathName);
        return pathName;
    }
}
