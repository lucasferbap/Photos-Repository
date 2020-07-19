import crypto from 'crypto';
import path from 'path';
import mkdirp from 'mkdirp';

interface ICreateRootFolder {
    folder_name: string;
    alias_name: string;
    path_name: string;
}

const createRootFolderConfig = async function create(
    userName: string,
    alias: string,
): Promise<ICreateRootFolder> {
    const folder_name = `${userName}-${crypto.randomBytes(10).toString('HEX')}`;
    const alias_name = alias;
    const path_name = path.resolve(
        `${process.env.STORAGE_FOLDER}${folder_name}`,
    );
    mkdirp(path_name);
    return {
        folder_name,
        alias_name,
        path_name,
    };
};

export default createRootFolderConfig;
