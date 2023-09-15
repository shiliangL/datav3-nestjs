import {
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Controller,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ApiTags, ApiOperation } from "@nestjs/swagger";

@Controller("users")
@ApiTags("用户管理")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({
    summary: "获取用户列表接口",
    description: "接口基本描述,接口细化备注说明描述",
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.register(createUserDto);
  }

  @Get()
  @ApiOperation({
    summary: "获取用户列表接口",
    description: "接口基本描述,接口细化备注说明描述",
  })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(":id")
  @ApiOperation({
    summary: "获取用户列表接口",
    description: "接口基本描述,接口细化备注说明描述",
  })
  findOne(@Param("id") id: string) {
    return this.usersService.findOne(+id);
  }

  @Put(":id")
  @ApiOperation({
    summary: "获取用户列表接口",
    description: "接口基本描述,接口细化备注说明描述",
  })
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "获取用户列表接口",
    description: "接口基本描述,接口细化备注说明描述",
  })
  remove(@Param("id") id: string) {
    return this.usersService.remove(+id);
  }
}
