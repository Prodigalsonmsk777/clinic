import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Queue } from '../entities/queue.entity';

@Injectable()
export class QueueService {
  constructor(@InjectRepository(Queue) private queueRepository: Repository<Queue>) {}

  async getAllQueues(): Promise<Queue[]> {
    return await this.queueRepository.find();
  }

  async addToQueue(queueData: Partial<Queue>): Promise<Queue> {
    const queue = this.queueRepository.create(queueData);
    return await this.queueRepository.save(queue);
  }

  async updateQueueStatus(id: number, status: string): Promise<Queue> {
    const queue = await this.queueRepository.findOneBy({ id });
    if (queue) {
      queue.status = status;
      return await this.queueRepository.save(queue);
    }
    throw new Error('Queue not found');
  }
}