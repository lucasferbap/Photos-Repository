import {
    PrimaryGeneratedColumn,
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from 'typeorm';
import Album from '../../../../albuns/infra/typeorm/entities/Album';
import Photo from '../../../../photos/infra/typeorm/entities/Photos';

@Entity('root_folders')
export default class Rootfolder {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    folder_name: string;

    @Column()
    alias_name: string;

    @Column()
    path_name: string;

    @OneToMany(type => Album, album => album.rootFolder)
    albuns: Album[];

    @OneToMany(type => Photo, photo => photo.rootFolder)
    photos: Photo[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
