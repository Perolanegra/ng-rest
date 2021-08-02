import { Entity, Column, PrimaryGeneratedColumn, Timestamp } from 'typeorm';

@Entity()
export class UserTitles {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, unique: false })
    id_user: number;

    @Column({ nullable: false, unique: false })
    id_title: number;

    @Column({ type: 'timestamp', default: () => "current_timestamp" })
    created_at: Timestamp;

    @Column({ default: null })
    deleted_at: string;

    @Column({ default: null })
    updated_at: string;
}