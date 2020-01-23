"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_entity_1 = require("../auth/user.entity");
const task_entity_1 = require("../tasks/task.entity");
exports.typeOrmConfig = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'taskmanagement',
    entities: [task_entity_1.Task, user_entity_1.User],
    synchronize: true,
};
//# sourceMappingURL=typeorm.config.js.map