import { Entity, Column, PrimaryGeneratedColumn, Timestamp } from 'typeorm';

enum Stars {
    ZERO = 0,
    ONE = 1,
    TWO = 2,
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

    @Column("enum", { enum: Stars, default: Stars.ZERO })
    stars: Stars;

    @Column({ nullable: false, default: Stars.ZERO }) // setar +1 view por acc diff
    views: Number;

    @Column({ nullable: false, default: '', type: 'varchar', length: 75 })
    tags: string;

    @Column({ nullable: false, default: 0 })
    posts_number: Number;

    @Column({ nullable: false, default: false })
    typeSurveyContent: boolean;

    @Column({ type: 'timestamp', default: () => "current_timestamp" })
    created_at: Timestamp;

    @Column({ default: '' })
    deleted_at: string;

    @Column({ default: '' })
    updated_at: string;
}