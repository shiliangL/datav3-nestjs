import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const { username } = createUserDto;
    const hasUsername = await this.userRepository.findOne({
      where: { username },
    });
    if (hasUsername) {
      throw new HttpException("用户名已存在", HttpStatus.BAD_REQUEST);
    }
    return await this.userRepository.save(createUserDto);
  }

  async findAll() {
    return this.userRepository.find();
  }

  async findOne(id: string) {
    return await this.userRepository.findOne({
      where: { id },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.preload({
      id: id,
      ...updateUserDto,
    });
    if (!user) {
      throw new Error(`未找到该用户数据`);
    }
    return await this.userRepository.save(user);
  }

  async remove(id: string) {
    const findOne = await this.findOne(id);
    if (!findOne) {
      throw new Error(`未找到该用户数据`);
    }
    return await this.userRepository.remove(findOne);
  }
}
