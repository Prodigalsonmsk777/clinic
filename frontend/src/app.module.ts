import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentController } from './appointment/appointment.controller';
import { AppointmentService } from './appointment/appointment.service';
import { DoctorController } from './doctor/doctor.controller';
import { DoctorService } from './doctor/doctor.service';
import { QueueController } from './queue/queue.controller';
import { QueueService } from './queue/queue.service';
import { Appointment } from './entities/appointment.entity';
import { Doctor } from './entities/doctor.entity';
import { Queue } from './entities/queue.entity';

@Module({
  imports: [
    // TypeOrmModule configuration for MySQL connection
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '192.168.29.144',
      port: 3306,
      username: 'root',
      password: 'karun1763',
      database: 'clinic',
      autoLoadEntities: true, // Automatically load entities
      synchronize: true, // Auto-sync schema (disable in production)
    }),
    // Importing TypeOrmModule with your entities
    TypeOrmModule.forFeature([Appointment, Doctor, Queue]),
  ],
  controllers: [AppointmentController, DoctorController, QueueController],
  providers: [AppointmentService, DoctorService, QueueService],
})
export class AppModule {}
