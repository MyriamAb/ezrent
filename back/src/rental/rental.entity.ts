import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm'

@Entity()
export class Rental {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    address: string;

    @Column("decimal" ,{ precision: 15, scale: 10 })
    longitude: number;

    @Column("decimal" ,{ precision: 15, scale: 10 })
    latitude: number;

    @Column()
    capacity: number;

    @Column("decimal" ,{ precision: 10, scale: 3 })
    price: number;

    @Column()
    start: Date;

    @Column()
    end: Date;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    created_at: Date;

    @Column()
    owner_id: number;
}
