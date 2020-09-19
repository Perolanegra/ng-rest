import { Entity, Column, PrimaryGeneratedColumn, Timestamp } from 'typeorm';

@Entity()
export class IssuePollResponse {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    id_poll: number;

    @Column({ nullable: false, type: 'varchar', length: 250 })
    answer: string;

    @Column({ type: 'timestamp', default: () => "current_timestamp" })
    created_at: Timestamp;

    @Column({ default: '' })
    deleted_at: string;

    @Column({ default: '' })
    updated_at: string;
}