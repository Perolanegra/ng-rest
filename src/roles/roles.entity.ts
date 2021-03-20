import { Entity, Column, PrimaryGeneratedColumn, Timestamp } from 'typeorm';

@Entity()
export class Roles {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, length: 125 })
  role: string;

  @Column({ nullable: false })
  description: string;

  @Column({ type: 'timestamp', default: () => 'current_timestamp' })
  created_at: Timestamp;

  @Column({ default: null })
  updated_at: string;

  @Column({ default: null })
  deleted_at: string;
}
