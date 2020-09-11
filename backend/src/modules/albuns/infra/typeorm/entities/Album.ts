/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
    ManyToOne,
    OneToMany,
} from 'typeorm';
import Rootfolder from '../../../../users/infra/typeorm/entities/RootFolder';
import Photo from '../../../../photos/infra/typeorm/entities/Photos';

@Entity('albuns')
class Album {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    album_name: string;

    @Column()
    alias_name: string;

    @Column()
    path_name: string;

    @ManyToOne(type => Rootfolder, rootFolder => rootFolder.albuns, {
        cascade: ['remove'],
    })
    @JoinColumn()
    rootFolder: Rootfolder;

    @OneToMany(type => Photo, photo => photo.album)
    photos: Photo[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Album;
