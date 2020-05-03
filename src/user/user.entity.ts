import { Entity, Column, PrimaryGeneratedColumn, Timestamp } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  username: string;

  @Column({ default: '' })
  password: string;

  @Column({ default: 4 })
  id_nivel: number;

  @Column({ default: '' })
  name: string;

  @Column({ default: '' })
  lastName: string;

  @Column({ default: '' })
  statusMsg: string;

  @Column({ default: '' })
  ddd: string;

  @Column({ default: '' })
  phone: string;

  @Column({ default: '' })
  email: string;

  @Column({ default: '' })
  photoURL: string;

  @Column({ default: '' })
  birthDate: string;

  @Column({ type: 'timestamp', default: () => "current_timestamp" })
  created_at: Timestamp;

  @Column({ default: '' })
  deleted_at: string;

  @Column({ default: '' })
  updated_at: string;

  @Column({ default: '0' })
  hasForgotPass: string;
}