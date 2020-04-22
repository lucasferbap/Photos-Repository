import multer from 'multer';
import path from 'path';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

export default {
    directory: tmpFolder,

    storage: multer.diskStorage({
        destination: tmpFolder,
        filename(requeste, file, callback) {
            const today = Date.now();
            const fileName = `${today}--${file.originalname}`;

            return callback(null, fileName);
        },
    }),
};
