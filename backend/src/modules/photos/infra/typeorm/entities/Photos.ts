/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    Entity,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import Album from '../../../../albuns/infra/typeorm/entities/Album';
import Rootfolder from '../../../../users/infra/typeorm/entities/RootFolder';

@Entity('photos')
export default class Photo {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    alias_name: string;

    @Column()
    path_name: string;

    @Column()
    url: string;

    @ManyToOne(type => Album, album => album.photos, {
        cascade: ['remove'],
    })
    @JoinColumn()
    album: Album | undefined;

    @ManyToOne(type => Album, album => album.photos, {
        cascade: ['remove'],
    })
    @JoinColumn()
    rootFolder: Rootfolder | undefined;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
