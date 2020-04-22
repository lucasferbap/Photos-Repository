import { getRepository } from 'typeorm';
import fs from 'fs';
import Photo from '../models/Photo';
import AppError from '../errors/AppError';

// interface DeletePhoto {
//     userId: string;
//     photoId: string;
// }

class DeletePhotoService {
    public async execute(photoId: string): Promise<void> {
        const photoRepository = getRepository(Photo);
        try {
            const photo = await photoRepository.findOne({
                where: { id: photoId },
            });
            if (!(photo?.path === undefined)) {
                fs.unlinkSync(photo?.path);
                await photoRepository.delete({ id: photoId });
            }
        } catch (error) {
            throw new AppError(error);
        }
    }
}

export default DeletePhotoService;
