import { Injectable, HttpException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserEntity } from "./entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>,
  ) {}

  async login(createUserDto: CreateUserDto) {
    return await this.repository.save(createUserDto);
  }

  async register(createUserDto: CreateUserDto) {
    const { username } = createUserDto;
    const user = await this.repository.findOne({
      where: { username: username },
    });
    if (user) return new HttpException("User already registered", 500);
    return this.repository.save(createUserDto);
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.repository.find();
  }

  async findOne(id: number): Promise<UserEntity> {
    return await this.repository.findOne({ where: { id: id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.repository.update(id, updateUserDto);
  }

  async remove(id: number) {
    return await this.repository.delete(id);
  }
}
