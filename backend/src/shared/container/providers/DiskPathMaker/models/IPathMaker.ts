export default interface IPathMaker {
    makeName(aliasName: string): string;
    makePath(
        createPath: boolean,
        rootFolderName?: string,
        albumName?: string,
        photoName?: string,
    ): string;
    moveArchive(oldPath: string, newPath: string): void;
    deleteFolder(path: string): void;
    deleteFile(path: string): void;
}
