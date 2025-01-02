import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Queue {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  patientName: string;

  @Column()
  queueNumber: number;

  @Column({ default: 'waiting' })
  status: string; // Possible values: 'waiting', 'with_doctor', 'completed'
}