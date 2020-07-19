import {
    PrimaryGeneratedColumn,
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

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

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
