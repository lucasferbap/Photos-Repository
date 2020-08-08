/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
    ManyToOne,
} from 'typeorm';
import Rootfolder from '../../../../users/infra/typeorm/entities/RootFolder';

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

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Album;
