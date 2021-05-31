import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Picture {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    image_name: string;

    @Column({type:"longblob"})
    image_blob: string;

    @Column()
    rental_id: number;
}
