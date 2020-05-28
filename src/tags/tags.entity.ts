import { Entity, Column, PrimaryGeneratedColumn, Timestamp } from 'typeorm';

enum TagsEnum {
    BUG = 'bug',
    IMPLEMENTATION = 'implementation',
    NEW = 'created',
    CLOSED = 'closed',
    REOPEN = 'reopen',
    ERROR = 'error',
    RESOLVED = 'resolved',
    ASK = 'question',
    HOT = 'hot',
    OLD = 'deprecated'
}

@Entity()
export class Tags {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    id_issue: number;

    @Column("enum", { enum: TagsEnum })
    tags: TagsEnum;

    @Column({ type: 'timestamp', default: () => "current_timestamp" })
    created_at: Timestamp;

    @Column({ default: '' })
    deleted_at: string;

    @Column({ default: '' })
    updated_at: string;
}