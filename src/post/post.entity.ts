import { Entity, Column, PrimaryGeneratedColumn, Timestamp } from 'typeorm';

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    id_issue: number;
    
    @Column({ nullable: false })
    id_author: Number;

    @Column({ nullable: false })
    author: string;

    @Column({ default: 0 })
    stars: Number;

    @Column({ type: 'timestamp', default: () => "current_timestamp" })
    created_at: Timestamp;

    @Column({ default: '' })
    deleted_at: string;

    @Column({ default: '' })
    updated_at: string;
}