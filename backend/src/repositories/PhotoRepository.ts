import { Repository } from 'typeorm';
import Photo from '../models/Photo';

interface DeletePhoto {
    userId: string;
    photoId: string;
}

@EntityRepository(Photo)
class RootFolderRepository extends Repository<Photo> {
    public async deletePhotoByIdAndUserId({
        userId,
        photoId,
    }: DeletePhoto): Promise<void> {
        try {
        } catch (error) {}
    }
}

export default RootFolderRepository;
