"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const applicationPort = 3000;
async function bootstrap() {
    const logger = new common_1.Logger('bootstrap');
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    await app.listen(applicationPort);
    logger.log(`Application listening on port ${applicationPort}`);
}
bootstrap();
//# sourceMappingURL=main.js.map