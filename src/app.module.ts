import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "./users/users.module";
// import { AppService } from "./app.service";
// import { AppController } from "./app.controller";
import { ArticleModule } from "./article/article.module";

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
    UsersModule,
    ArticleModule,
  ],
  controllers: [
    // AppController
  ],
  providers: [
    // AppService
  ],
})
export class AppModule {}
