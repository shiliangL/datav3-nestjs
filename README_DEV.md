### swagger 使用接口文档

#### 安装依赖

```js
npm install @nestjs / swagger swagger - ui - express - D
```

#### 项目入口main.ts配置使用

```js
import {
    NestFactory
} from "@nestjs/core";
import {
    AppModule
} from "./app.module";
import {
    SwaggerModule,
    DocumentBuilder
} from "@nestjs/swagger";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const config = new DocumentBuilder()
        .setTitle("Api")
        .setDescription("Api接口文档")
        .setVersion("1.0")
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("docs", app, document);

    await app.listen(3000);
}
bootstrap();
```

### 使用swagger 装饰器优化标记接口

使用ApiTags 添加接口分组

```js
import {
    ApiTags,
    ApiOperation
} from "@nestjs/swagger"

@Controller("users")
@ApiTags("用户管理")
export class UsersController {

    @Get()
    @ApiOperation({
        summary: "获取用户列表接口",
        description: "接口基本描述,接口细化备注说明描述"
    })
    findAll() {
        return this.usersService.findAll();
    }
}
```
