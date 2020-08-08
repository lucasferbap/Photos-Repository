import Rootfolder from '../../users/infra/typeorm/entities/RootFolder';

export default interface ICreateAlbumDTO {
    aliasName: string;
    rootFolder: Rootfolder;
    album_name: string;
    path_name: string;
}
