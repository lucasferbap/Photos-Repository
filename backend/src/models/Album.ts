import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
    OneToMany,
} from 'typeorm';
import RootFolder from './RootFolder';
import Photo from './Photo';

@Entity('albuns')
class Album {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    path: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(type => RootFolder, rootFolder => rootFolder.albuns)
    @JoinColumn({ name: 'rootFolderId', referencedColumnName: 'id' })
    rootFolder: RootFolder;

    @OneToMany(type => Photo, photo => photo.album)
    photos: Array<Photo>;
}

export default Album;
