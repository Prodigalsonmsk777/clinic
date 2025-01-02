import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { QueueService } from './queue.service';
import { Queue } from '../entities/queue.entity';

@Controller('queue')
export class QueueController {
  constructor(private readonly queueService: QueueService) {}

  @Get()
  async getAllQueues() {
    return await this.queueService.getAllQueues();
  }

  @Post()
  async addToQueue(@Body() queueData: Partial<Queue>) {
    return await this.queueService.addToQueue(queueData);
  }

  @Put(':id')
  async updateQueueStatus(@Param('id') id: number, @Body() status: { status: string }) {
    return await this.queueService.updateQueueStatus(id, status.status);
  }
}