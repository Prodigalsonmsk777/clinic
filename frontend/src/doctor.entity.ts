import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Doctor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  specialization: string;

  @Column()
  location: string;

  @Column()
  gender: string;

  @Column()
  availability: string; // Example: "Monday-Friday 9:00AM-5:00PM"
}