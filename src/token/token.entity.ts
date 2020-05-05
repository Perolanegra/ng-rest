import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne } from 'typeorm';
import { User } from 'src/user/user.entity';

@Entity()
export class Token {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    id_user: number;

    @Column({ nullable: false,  type: "text" })
    token: string;

}