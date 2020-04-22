import fs from 'fs';
import { getRepository, getCustomRepository } from 'typeorm';
import Album from '../models/Album';
import Photo from '../models/Photo';
import AlbumFolderRepository from '../repositories/AlbumFolderRepository';

interface PhotoTransfer {
    userId: string;
    title: Array<string>;
    albumName: string;
    files: any | Express.Multer.File[];
}

// Devolve o Album com as fotos recem adicionadas
class SavePhotosService {
    public async execute({
        userId,
        title,
        albumName,
        files,
    }: PhotoTransfer): Promise<Album | undefined> {
        const photos: Array<Photo> = [];
        const photoRepository = getRepository(Photo);
        const albumRepository = getCustomRepository(AlbumFolderRepository);
        const album = await albumRepository.findAlbumPerTitleAndUserId(
            userId,
            albumName,
        );

        if (Array.isArray(files)) {
            files.forEach((file, i = 0) => {
                const newPath = `${album?.path}\\${file.filename}`;
                fs.rename(file.path, newPath, err => {
                    if (err) {
                        throw err;
                    } else {
                        console.log('Successfully moved the file!');
                    }
                });
                const photo = photoRepository.create({
                    title: title[i],
                    path: newPath,
                    album,
                });
                i += 1;
                photos.push(photo);
            });
        }
        await photoRepository.save(photos);
        const newAlbumm = await albumRepository.findAlbumWithAllPhotos(
            albumName,
        );
        return newAlbumm;
    }
}

export default SavePhotosService;
