import { IsString, IsNotEmpty } from "class-validator";
export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
