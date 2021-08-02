import { Entity, Column, PrimaryGeneratedColumn, Timestamp } from 'typeorm';
/**
 * Entidade referente a Enquete da Issue
 */
@Entity()
export class IssuePoll {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    id_post: number;

    @Column({ nullable: false })
    id_issue: number;

    @Column({ default: '' })
    closingDate: string;

    @Column({ default: '' })
    closingTime: string;

    @Column({ default: false })
    hasMultipleChoice: boolean;

    @Column({ default: false })
    displayWhoVoted: boolean;

    @Column({ nullable: false, type:'varchar', length: 150 })
    question: string;

    @Column({ nullable: false, type:'varchar', length: 150 })
    title: string;

    @Column({ type: 'timestamp', default: () => "current_timestamp" })
    created_at: Timestamp;

    @Column({ default: null })
    deleted_at: string;

    @Column({ default: null })
    updated_at: string;
}