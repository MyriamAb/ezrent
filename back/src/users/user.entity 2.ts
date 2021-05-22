import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({nullable: true})
    phone: string;

    @Column({nullable: true})
    reset_password: string;

    @Column({nullable: true})
    verif_email: string;

    @Column({nullable: true})
    profile_picture: BinaryType;
}
