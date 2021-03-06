import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerEntity } from 'src/database/entities/customer.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(CustomerEntity)
    private customerRepository: Repository<CustomerEntity>,
  ) {}

  async findOneBy(
    where:
      | FindOptionsWhere<CustomerEntity>
      | FindOptionsWhere<CustomerEntity>[],
  ) {
    return this.customerRepository.findOneBy(where);
  }

  async getOne(userId: number) {
    return await this.customerRepository.findOneBy({ customer_id: userId });
  }

  async signUp(dto: CreateUserDto) {
    return await this.customerRepository.save({
      ...dto,
      password: await bcrypt.hash(dto.password, 10),
    });
  }

  async update(userId: number, dto: UpdateUserDto) {
    return await this.customerRepository.update(1, dto);
  }

  async delete(userId: number) {
    return await this.customerRepository.delete(userId);
  }
}
