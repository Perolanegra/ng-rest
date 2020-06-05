import { Entity, Column, PrimaryGeneratedColumn, Timestamp } from 'typeorm';
import { TagsEnum } from 'src/tags/tags.enum';

enum Stars {
    ONE = 1,
    TWO =  2,
    THREE = 3,
    FOUR = 4,
    FIVE = 5
}

@Entity()
export class Issues {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    id_user: number;

    @Column({ nullable: false, type: 'varchar', length: 75 })
    title: string;

    @Column({ nullable: false, type: 'varchar', length: 150 })
    subtitle: string;

    @Column({ nullable: false, type: 'varchar', length: 25 })
    author: string;

    @Column("enum", { enum: Stars })
    stars: Stars;

    @Column({ nullable: false, default: 0 }) // setar +1 view por acc diff
    views: Number;

    @Column({ nullable: false, default: '', type: 'varchar', length: 40 })
    tags: string;

    @Column({ type: 'timestamp', default: () => "current_timestamp" })
    created_at: Timestamp;

    @Column({ default: '' })
    deleted_at: string;

    @Column({ default: '' })
    updated_at: string;
}