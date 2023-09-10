import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>,
  ) {}

  async register(createUserDto: CreateUserDto) {
    return await this.repository.findOne(createUserDto);
  }

  async login(createUserDto: CreateUserDto) {
    return await this.repository.save(createUserDto);
  }

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    // delete createUserDto.id;
    return await this.repository.save(createUserDto);
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
