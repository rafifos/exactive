import { Task } from 'src/tasks/task.entity';
import { BaseEntity } from 'typeorm';
export declare class User extends BaseEntity {
    id: number;
    username: string;
    salt: string;
    password: string;
    tasks: Task[];
    validatePassword(password: string): Promise<boolean>;
}
