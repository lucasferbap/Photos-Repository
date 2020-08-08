export default interface IPathMaker {
    makeName(aliasName: string): string;
    makePath(rootFolderName?: string, albumName?: string): Promise<string>;
}
