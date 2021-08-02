import { Entity, Column, PrimaryGeneratedColumn, Timestamp } from 'typeorm';
@Entity()
export class IssueViews {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    id_issue: number;

    @Column({ nullable: false })
    id_user: number

    @Column({ type: 'timestamp', default: () => "current_timestamp" })
    created_at: Timestamp;

    @Column({ default: null })
    deleted_at: string;

    @Column({ default: null })
    updated_at: string;
}