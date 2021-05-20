import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm'

@Entity()
export class Activity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    rental_id: number;

    @Column()
    vacation: boolean;

    @Column()
    party: boolean;

    @Column()
    photo_shooting: boolean;

    @Column()
    movie_shooting: boolean;

    @Column()
    seminaries: boolean;

    @Column()
    business_trip: boolean;

    @Column()
    other: boolean;

}
