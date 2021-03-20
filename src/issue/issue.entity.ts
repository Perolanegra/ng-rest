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
export class Issue {
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

    @Column({ nullable: false, default: Stars.ZERO })
    stars: Number;

    @Column({ nullable: false, default: Stars.ZERO })
    pplVoted: Number;

    @Column({ nullable: false, default: Stars.ZERO }) // setar +1 view por acc diff
    views: Number;

    @Column({ nullable: false, default: '', type: 'varchar', length: 400 })
    tags: string;

    @Column({ nullable: false, default: '', type: 'varchar', length: 455 })
    tag_colors: string;

    @Column({ nullable: false, default: 1 })
    posts_number: Number;

    @Column({ nullable: false, default: false })
    typeSurveyContent: boolean;

    @Column({ type: 'timestamp', default: () => "current_timestamp" })
    created_at: Timestamp;

    @Column({ default: null })
    deleted_at: string;

    @Column({ default: null })
    updated_at: string;
}