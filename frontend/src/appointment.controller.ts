import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { Appointment } from '../entities/appointment.entity';

@Controller('appointments')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Get()
  async getAllAppointments() {
    return await this.appointmentService.getAllAppointments();
  }

  @Post()
  async bookAppointment(@Body() appointmentData: Partial<Appointment>) {
    return await this.appointmentService.bookAppointment(appointmentData);
  }

  @Put(':id')
  async rescheduleAppointment(
    @Param('id') id: number,
    @Body() updateData: { date: string; time: string }
  ) {
    return await this.appointmentService.rescheduleAppointment(id, updateData);
  }

  @Delete(':id')
  async cancelAppointment(@Param('id') id: number) {
    return await this.appointmentService.cancelAppointment(id);
  }
}