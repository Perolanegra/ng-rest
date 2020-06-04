import { Entity, Column, PrimaryGeneratedColumn, Timestamp } from 'typeorm';

@Entity()
export class Media {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    id_issue: number;

    @Column({ nullable: false })
    id_post: number;

    @Column({ nullable: false, type: 'varchar', length: 250, default: '' })
    url: string;

   @Column({ type: 'timestamp', default: () => "current_timestamp" })
    created_at: Timestamp;

    @Column({ default: '' })
    deleted_at: string;

    @Column({ default: '' })
    updated_at: string;
}