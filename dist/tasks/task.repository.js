"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const user_entity_1 = require("../auth/user.entity");
const typeorm_1 = require("typeorm");
const get_tasks_filter_dto_1 = require("./dto/get-tasks-filter.dto");
const task_status_enum_1 = require("./task-status.enum");
const task_entity_1 = require("./task.entity");
let TaskRepository = class TaskRepository extends typeorm_1.Repository {
    constructor() {
        super(...arguments);
        this.logger = new common_1.Logger('TaskRepository');
    }
    async getTasks(filterDto, user) {
        const { status, search } = filterDto;
        const query = this.createQueryBuilder('task');
        query.where('task.userId = :userId', { userId: user.id });
        if (status) {
            query.andWhere('task.status = :status', { status });
        }
        if (search) {
            query.andWhere('(task.title LIKE :search OR task.description LIKE :search)', { search: `%${search}%` });
        }
        try {
            const tasks = await query.getMany();
            return tasks;
        }
        catch (error) {
            this.logger.error(`Failed to get Tasks for User ${user.username}. Filters: ${JSON.stringify(get_tasks_filter_dto_1.GetTasksFilterDto)}`, error.stack);
            throw new common_1.InternalServerErrorException();
        }
    }
    async createTask(createTaskDto, user) {
        const { title, description } = createTaskDto;
        const task = new task_entity_1.Task();
        task.title = title;
        task.description = description;
        task.status = task_status_enum_1.TaskStatus.OPEN;
        task.user = user;
        try {
            await task.save();
        }
        catch (error) {
            this.logger.error(`Failed to create Task for User ${user.username}. Data: ${JSON.stringify(createTaskDto)}`, error.stack);
            throw new common_1.InternalServerErrorException();
        }
        this.logger.debug('Removing User Entity from Task');
        delete task.user;
        return task;
    }
};
TaskRepository = __decorate([
    typeorm_1.EntityRepository(task_entity_1.Task)
], TaskRepository);
exports.TaskRepository = TaskRepository;
//# sourceMappingURL=task.repository.js.map