import { Request, Response } from 'express';
import path from 'path';
import AppError from '../../../../../shared/errors/AppError';

export default function serverPhotos(
    request: Request,
    response: Response,
): void {
    const { userId, fileName } = request.params;
    const { rootFolder, albumName } = request.query;
    const authenticatedUser = request.user.id;

    if (userId !== authenticatedUser) {
        throw new AppError("Sorry! You can't see that", 403);
    }

    const filePath = path.resolve(
        __dirname,
        '..',
        '..',
        '..',
        '..',
        '..',
        '..',
        'uploads',
        rootFolder as string,
        albumName as string,
        fileName,
    );
    response.sendFile(filePath);
}
