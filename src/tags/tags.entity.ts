import { Entity, Column, PrimaryGeneratedColumn, Timestamp } from 'typeorm';
import { TagsEnum } from './tags.enum';
@Entity()
export class Tags {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("enum", { enum: TagsEnum, unique: true })
    value: TagsEnum;

    @Column({ default: '' })
    color: string;

    @Column({ type: 'timestamp', default: () => "current_timestamp" })
    created_at: Timestamp;

    @Column({ default: null })
    deleted_at: string;

    @Column({ default: null })
    updated_at: string;
}