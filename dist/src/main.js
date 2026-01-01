"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('api/v1');
    app.enableCors();
    app.useGlobalPipes(new common_1.ValidationPipe());
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Basic API')
        .setDescription('Basic API')
        .setVersion('1.2')
        .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
    }, 'JWT-auth')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('docs', app, document, {
        swaggerOptions: {
            persistAuthorization: true,
        },
    });
    await app.listen(process.env.PORT ?? 3000);
    await app.listen(process.env.PORT ?? 3000);
    console.log(`Server is running on port ${process.env.PORT ?? 3000}`);
    console.log(`http://localhost:${process.env.PORT ?? 3000}`);
    console.log(`Swagger documentation: http://localhost:${process.env.PORT ?? 3000}/docs`);
}
bootstrap();
//# sourceMappingURL=main.js.map