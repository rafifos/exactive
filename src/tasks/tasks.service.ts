import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';

@Injectable()
export class TasksService {
  private logger = new Logger('TasksService');

  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository
  ) {}

  async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    return this.taskRepository.getTasks(filterDto, user);
  }

  async getTaskById(id: number, user: User): Promise<Task> {
    const found = await this.taskRepository.findOne({});

    if (!found) {
      this.logger.error(
        `User ${user.username} tried to retrieve Task with ID: ${id}, but no task matching the criteria exists on the server`
      );
      throw new NotFoundException(
        `Task with ID '${id}' doesn't exist on the server.`
      );
    }

    return found;
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto, user);
  }

  async updateTaskStatus(
    id: number,
    status: TaskStatus,
    user: User
  ): Promise<Task> {
    const task = await this.getTaskById(id, user);
    task.status = status;

    try {
      await task.save();
      return task;
    } catch (error) {
      this.logger.error(
        'Failed to update task status, see the stacktrace below for more details',
        error.stack
      );
      throw new InternalServerErrorException();
    }
  }

  async deleteTask(id: number, user: User): Promise<void> {
    const result = await this.taskRepository.delete({ id, userId: user.id });

    if (result.affected === 0) {
      this.logger.error(
        `User ${user.username} tried to delete Task with ID: ${id}, but no task matching the criteria exists on the server`
      );
      throw new NotFoundException(
        `Task with ID '${id}' doesn't exist on the server.`
      );
    }
  }
}
