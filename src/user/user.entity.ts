import { Entity, Column, PrimaryGeneratedColumn, Timestamp } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  id_nivel: number;

  @Column()
  name: string;

  @Column()
  lastName: string;

  @Column()
  statusMsg: string;

  @Column()
  ddd: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  photoURL: string;

  @Column()
  birthDate: string;

  @Column({ type: 'timestamp' })
  created_at: Timestamp;

  @Column()
  deleted_at: string;

  @Column()
  updated_at: string;
}