import { Entity, Column, PrimaryGeneratedColumn, Timestamp } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 25, unique: true })
  username: string;

  @Column({ length: 100 })
  password: string;

  @Column({ default: 4 })
  id_nivel: number;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 75 })
  lastName: string;

  @Column({ length: 175 })
  statusMsg: string;

  @Column({ length: 3 })
  ddd: string;

  @Column({ length: 20 })
  phone: string;

  @Column({ unique: true, length: 250 })
  email: string;

  @Column({ default: '' })
  photoURL: string;

  @Column()
  birthDate: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Timestamp;

  @Column({ type: "timestamp", default: null })
  deleted_at: Timestamp;

  @Column({ type: "timestamp", default: null })
  updated_at: Timestamp;
}