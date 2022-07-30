import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { verifyEmail, verifyPhone } from 'src/shared/utils/verification';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreateInput } from './dtos/create.input';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findOneByEmail(email: string) {
    return this.userRepository.findOne({
      where: {
        email
      }
    })
  }

  async findOneByPhone(phone: string) {
    return this.userRepository.findOne({
      where: {
        phone
      }
    })
  }

  async createUser(createInput: CreateInput) {
    const user = await this.userRepository.create(createInput)
    return this.userRepository.save(user)
  }
}
