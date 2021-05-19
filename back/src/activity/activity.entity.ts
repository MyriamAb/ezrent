import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm'

@Entity()
export class Activity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    rental_id: number;

    @Column()
    service_1: boolean;

    @Column()
    service_2: boolean;

    @Column()
    service_3: boolean;

    @Column()
    service_4: boolean;

}
