import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    OneToOne,
    JoinColumn,
} from 'typeorm';
import Album from './Album';
import User from './User';

@Entity('root_folders')
class RootFolder {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    folderName: string;

    @Column()
    path: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @OneToMany(type => Album, album => album.rootFolder)
    albuns: Album[];

    @OneToOne(type => User, user => user.root_folder)
    @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
    user: User;
}

export default RootFolder;
