import { Entity, Column, PrimaryGeneratedColumn, Timestamp } from 'typeorm';

/**
 * Entidade referente a cada post do Issue
 */
@Entity()
export class IssueTextContent {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    id_post: number;

    @Column({ nullable: false })
    id_issue: number;
    
    @Column({ nullable: false, type: 'text' })
    context: string;

    @Column({ nullable: false, default: false })
    enableNotifications: boolean;
    
    @Column({ type: 'timestamp', default: () => "current_timestamp" })
    created_at: Timestamp;

    @Column({ default: '' })
    deleted_at: string;

    @Column({ default: '' })
    updated_at: string;
}