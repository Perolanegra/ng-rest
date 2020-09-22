import { Entity, Column, PrimaryGeneratedColumn, Timestamp } from 'typeorm';
import { TagsEnum } from './tags.enum';


@Entity()
export class Tags {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("enum", { enum: TagsEnum })
    value: TagsEnum;

    @Column({ type: 'timestamp', default: () => "current_timestamp" })
    created_at: Timestamp;

    @Column({ default: '' })
    deleted_at: string;

    @Column({ default: '' })
    updated_at: string;
}