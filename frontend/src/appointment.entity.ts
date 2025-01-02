import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  patientName: string;

  @Column()
  doctorId: number;

  @Column()
  date: string;

  @Column()
  time: string;

  @Column({ default: 'booked' })
  status: string;
}