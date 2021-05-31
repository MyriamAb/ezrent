import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm'

@Entity()
export class Reservation {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    start: Date;

    @Column()
    end: Date;
    
    @Column()
    owner_id: number;

    @Column({nullable: true})
    owner_review: boolean;

    @Column()
    client_id: number;

    @Column({nullable: true})
    client_review: boolean;

    @Column("decimal" ,{ precision: 10, scale: 3 })
    price: number;

    @Column()
    status: string;
    
    @CreateDateColumn({type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    created_at: Date;

    @Column()
    rental_id: number;
}
