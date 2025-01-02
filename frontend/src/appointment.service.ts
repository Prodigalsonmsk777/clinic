import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from '../entities/appointment.entity';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment) private appointmentRepository: Repository<Appointment>,
  ) {}

  async getAllAppointments(): Promise<Appointment[]> {
    return await this.appointmentRepository.find();
  }

  async bookAppointment(appointmentData: Partial<Appointment>): Promise<Appointment> {
    const appointment = this.appointmentRepository.create(appointmentData);
    return await this.appointmentRepository.save(appointment);
  }

  async rescheduleAppointment(
    id: number,
    updateData: { date: string; time: string },
  ): Promise<Appointment> {
    const appointment = await this.appointmentRepository.findOneBy({ id });
    if (appointment) {
      appointment.date = updateData.date;
      appointment.time = updateData.time;
      return await this.appointmentRepository.save(appointment);
    }
    throw new Error('Appointment not found');
  }

  async cancelAppointment(id: number): Promise<void> {
    const appointment = await this.appointmentRepository.findOneBy({ id });
    if (appointment) {
      await this.appointmentRepository.remove(appointment);
    } else {
      throw new Error('Appointment not found');
    }
  }
}