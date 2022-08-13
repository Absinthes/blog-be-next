import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getForeign } from 'src/shared/utils';
import { Repository } from 'typeorm';
import { createTypeInput } from './dtos/createType.input';
import { Type } from './entity/type.entity';

@Injectable()
export class TypeService {
  constructor(
    @InjectRepository(Type)
    private readonly TypeRepository: Repository<Type>,
  ) {}

  public async getTypeByRoot(offset: number, limit: number) {
    return await this.TypeRepository.createQueryBuilder('type')
      .leftJoinAndSelect('type.childType', 'childType')
      .leftJoinAndSelect('type.parentType', 'parentType')
      .leftJoinAndSelect('type.rootType', 'rootType')
      .where('type.rootType IS NULL')
      .limit(limit)
      .offset(offset)
      .getMany()
  }

  public async getTypeById(id: string) {
    return await this.TypeRepository.createQueryBuilder('type')
      .where('type.id = :id', { id })
      .getOne();
  }

  public async getTypeParentById(id: string) {
    return await this.TypeRepository.createQueryBuilder('type')
      .select('rootType')
      .leftJoinAndSelect('type.rootType', 'rootType')
      .where('type.id = :id', { id })
      .getOne();
  }

  public async createType(input: createTypeInput) {
    const data = await getForeign(
      input,
      ['rootType', 'parentType'],
      [this.getTypeById.bind(this), this.getTypeById.bind(this)],
    );
    const newType = this.TypeRepository.create(data);
    await this.TypeRepository.save(newType);
  }

  public async deleteType() {}
}
