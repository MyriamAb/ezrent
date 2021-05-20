import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Picture {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    image_name: string;

    @Column()
    image_blob: BinaryType;

    @Column()
    rental_id: number;
}
