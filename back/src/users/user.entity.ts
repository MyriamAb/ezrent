import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({unique: true})
    email: string;

    @Column({nullable: true})
    password: string;

    @Column({nullable: true})
    phone: string;

    @Column({nullable: true})
    reset_password: string;

    @Column({nullable: true})
    verif_email: string;

    @Column({ nullable: true, type:"longblob" })
    profile_picture: string;

    @Column({ default: "Pending" })
    status: string;
    
    @Column({ nullable: true, select: false })
    stripeCustomerId: string;
}
