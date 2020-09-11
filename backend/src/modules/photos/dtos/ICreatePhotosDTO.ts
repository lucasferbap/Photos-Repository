export default interface ICreatePhotosDTO {
    userId: string;
    photos:
        | Express.Multer.File[]
        | {
              [fieldname: string]: Express.Multer.File[];
          };
    rootFolderName: string;
    albumName?: string;
}
