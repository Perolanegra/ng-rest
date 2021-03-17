import { Entity, Column, PrimaryGeneratedColumn, Timestamp } from 'typeorm';

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: false })
  id_user: number;

  @Column({ type: 'bigint', default: 5 })
  ngCoins: number;

  @Column({ type: 'timestamp', default: () => "current_timestamp" })
  created_at: Timestamp;

  @Column({ default: '' })
  deleted_at: string;

  @Column({ default: '' })
  updated_at: string;

}