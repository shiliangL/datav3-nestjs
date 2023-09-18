// import { AppService } from "./app.service";
// import { AppController } from "./app.controller";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "./user/user.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      // password: "123456",
      // database: "nestjs",
      password: "shiliangl123456..",
      database: "pipeline",
      autoLoadEntities: true, // 使用这个配置自动导入entities
      synchronize: true,
    }),
    UserModule,
  ],
  controllers: [
    // AppController
  ],
  providers: [
    // AppService
  ],
})
export class AppModule {}
