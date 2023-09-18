### swagger 使用接口文档

#### 安装依赖

```js
npm install @nestjs / swagger swagger - ui - express - D
```

#### 项目入口main.ts配置使用

```js
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

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

#### 使用swagger 装饰器优化标记接口

- 使用ApiTags 添加接口分组；控制台添加
- ApiOperation 接口描述; 具体接口添加 @ApiOperation({summary:"对具体API的描述",description:"描述细项"})
- ApiParam 动态参数描述； 具体接口添加 @ApiParam({name:"id",description:"用户id",required:true})
-

```js
import { ApiTags, ApiOperation } from "@nestjs/swagger";

@Controller("users")
@ApiTags("用户管理")
export class UsersController {
  @Get()
  @ApiOperation({
    summary: "获取用户列表接口",
    description: "接口基本描述,接口细化备注说明描述",
  })
  findAll() {
    return this.usersService.findAll();
  }
}
```

### 用户登录注册，JWT认证权限

- 密码加密方案

```Typescript

pnpm add bcryptjs -S

```

使用到的加严加密

```Typescript

/**
 * 加密处理 - 同步方法
 * bcryptjs.hashSync(data, salt)
 *    - data  要加密的数据
 *    - slat  用于哈希密码的盐。如果指定为数字，则将使用指定的轮数生成盐并将其使用。推荐 10
 */
const hashPassword = bcryptjs.hashSync(password, 10)

/**
 * 校验 - 使用同步方法
 * bcryptjs.compareSync(data, encrypted)
 *    - data        要比较的数据, 使用登录时传递过来的密码
 *    - encrypted   要比较的数据, 使用从数据库中查询出来的加密过的密码
 */
const isOk = bcryptjs.compareSync(password, encryptPassword)
```
