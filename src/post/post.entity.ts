import { Entity, Column, PrimaryGeneratedColumn, Timestamp } from 'typeorm';

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    id_issue: number;
    
    @Column({ nullable: false })
    id_author: number;

    @Column({ nullable: false })
    author: string;

    @Column({ nullable: false, default: 0 })
    stars: number;

    @Column({ nullable: false, default: 0 })
    pplVoted: number;

    @Column({ type: 'timestamp', default: () => "current_timestamp" })
    created_at: Timestamp;

    @Column({ default: '' })
    deleted_at: string;

    @Column({ default: '' })
    updated_at: string;
}