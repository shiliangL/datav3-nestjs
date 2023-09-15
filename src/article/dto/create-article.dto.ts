import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateArticleDto {
  @ApiProperty({
    description: "文章标题",
    example: "吃饭睡觉打豆豆",
  })
  @IsNotEmpty()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  readonly body: string;

  readonly userId: number;

  readonly tagList: string[];
}
