import { Entity, Column, PrimaryGeneratedColumn, Timestamp, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  username: string;

  @Column({ default: '' })
  password: string;

  @Column({ default: 5 })
  id_perfil: number;

  @Column({ nullable: false, length: 25, type: 'varchar' })
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

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}