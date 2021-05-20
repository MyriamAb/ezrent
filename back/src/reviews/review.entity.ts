import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm'

@Entity()
export class Review {
    @PrimaryGeneratedColumn()
    id: number;
 
    @Column()
    grade: number;
    
    @Column()
    comment: string;
    
    @Column()
    reviewed_id: number;
    
    @Column()
    reviewer_id: number;
    
    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    created_at: Date;

}
