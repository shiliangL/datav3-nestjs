import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Length } from "class-validator";
export class CreateUserDto {
  @ApiProperty({
    description: "用户名称",
    example: "admin",
  })
  @IsNotEmpty()
  @IsString()
  @Length(5, 10, {
    message: "字符在5个到10个之间",
  })
  readonly username: string;

  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({
    description: "用户密码",
    example: "123456",
  })
  @IsNotEmpty()
  readonly password: string;
}
