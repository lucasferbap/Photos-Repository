import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
    JoinColumn,
} from 'typeorm';

import { Exclude } from 'class-transformer';
import Rootfolder from './RootFolder';

@Entity('users')
class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    @Exclude()
    password: string;

    @Column()
    email: string;

    @OneToOne(type => Rootfolder, { cascade: ['insert', 'remove'] })
    @JoinColumn()
    rootFolder: Rootfolder;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default User;
