import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { Doctor } from '../entities/doctor.entity';

@Controller('doctors')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Get()
  async getAllDoctors(
    @Query('specialization') specialization?: string,
    @Query('location') location?: string,
    @Query('availability') availability?: string,
  ) {
    return await this.doctorService.getDoctors(specialization, location, availability);
  }

  @Post()
  async addDoctor(@Body() doctorData: Partial<Doctor>) {
    return await this.doctorService.addDoctor(doctorData);
  }

  @Put(':id')
  async updateDoctor(@Param('id') id: number, @Body() doctorData: Partial<Doctor>) {
    return await this.doctorService.updateDoctor(id, doctorData);
  }

  @Delete(':id')
  async deleteDoctor(@Param('id') id: number) {
    return await this.doctorService.deleteDoctor(id);
  }
}