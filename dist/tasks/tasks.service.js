"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../auth/user.entity");
const task_repository_1 = require("./task.repository");
let TasksService = class TasksService {
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
        this.logger = new common_1.Logger('TasksService');
    }
    async getTasks(filterDto, user) {
        return this.taskRepository.getTasks(filterDto, user);
    }
    async getTaskById(id, user) {
        const found = await this.taskRepository.findOne({});
        if (!found) {
            this.logger.error(`User ${user.username} tried to retrieve Task with ID: ${id}, but no task matching the criteria exists on the server`);
            throw new common_1.NotFoundException(`Task with ID '${id}' doesn't exist on the server.`);
        }
        return found;
    }
    async createTask(createTaskDto, user) {
        return this.taskRepository.createTask(createTaskDto, user);
    }
    async updateTaskStatus(id, status, user) {
        const task = await this.getTaskById(id, user);
        task.status = status;
        try {
            await task.save();
            return task;
        }
        catch (error) {
            this.logger.error('Failed to update task status, see the stacktrace below for more details', error.stack);
            throw new common_1.InternalServerErrorException();
        }
    }
    async deleteTask(id, user) {
        const result = await this.taskRepository.delete({ id, userId: user.id });
        if (result.affected === 0) {
            this.logger.error(`User ${user.username} tried to delete Task with ID: ${id}, but no task matching the criteria exists on the server`);
            throw new common_1.NotFoundException(`Task with ID '${id}' doesn't exist on the server.`);
        }
    }
};
TasksService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(task_repository_1.TaskRepository)),
    __metadata("design:paramtypes", [task_repository_1.TaskRepository])
], TasksService);
exports.TasksService = TasksService;
//# sourceMappingURL=tasks.service.js.map