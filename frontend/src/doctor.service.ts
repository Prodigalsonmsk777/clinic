import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Doctor } from '../entities/doctor.entity';

@Injectable()
export class DoctorService {
  constructor(@InjectRepository(Doctor) private doctorRepository: Repository<Doctor>) {}

  async getDoctors(specialization?: string, location?: string, availability?: string): Promise<Doctor[]> {
    const queryBuilder = this.doctorRepository.createQueryBuilder('doctor');

    if (specialization) {
      queryBuilder.andWhere('doctor.specialization = :specialization', { specialization });
    }
    if (location) {
      queryBuilder.andWhere('doctor.location = :location', { location });
    }
    if (availability) {
      queryBuilder.andWhere('doctor.availability = :availability', { availability });
    }

    return await queryBuilder.getMany();
  }

  async addDoctor(doctorData: Partial<Doctor>): Promise<Doctor> {
    const doctor = this.doctorRepository.create(doctorData);
    return await this.doctorRepository.save(doctor);
  }

  async updateDoctor(id: number, doctorData: Partial<Doctor>): Promise<Doctor> {
    const doctor = await this.doctorRepository.findOneBy({ id });
    if (doctor) {
      Object.assign(doctor, doctorData);
      return await this.doctorRepository.save(doctor);
    }
    throw new Error('Doctor not found');
  }

  async deleteDoctor(id: number): Promise<void> {
    const doctor = await this.doctorRepository.findOneBy({ id });
    if (doctor) {
      await this.doctorRepository.remove(doctor);
    } else {
      throw new Error('Doctor not found');
    }
  }
}