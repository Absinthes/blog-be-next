import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getForeign } from 'src/shared/utils';
import { Repository } from 'typeorm';
import { createTypeInput } from './dtos/createType.input';
import { updateTypeInput } from './dtos/updateType.input';
import { Type } from './entity/type.entity';

type typeType = "rootType" | "parentType" | "childType"

@Injectable()
export class TypeService {
  constructor(
    @InjectRepository(Type)
    private readonly TypeRepository: Repository<Type>,
  ) {}

  public async getTypeByRoot(offset: number, limit: number) {
    return await this.TypeRepository.createQueryBuilder('type')
    .leftJoinAndSelect('type.childType',"childType")
    .leftJoinAndSelect('type.parentType', 'parentType')
    .leftJoinAndSelect('type.rootType', 'rootType')
    .leftJoinAndSelect('childType.rootType',"childTypeAndRoot")
    .leftJoinAndSelect('childType.parentType',"childTypeAndParent")
    .where('type.rootType IS NULL')
    .limit(limit)
    .offset(offset)
    .getManyAndCount() 
  }

  public async getTypeById(id: string, relations: typeType[] = []) {
    const re = {};
    relations.forEach((prop) => {
      re[prop] = true;
    });
    return await this.TypeRepository.findOne({
      where:{
        id
      },
      relations: {
        ...re,
      },
    })
  }

  public async getTypeByPhoto(id:string){
    return await this.TypeRepository.findOne({
      where:{
        photos:{
          id
        }
      }
    })
  }

  public async getTypeByArticleId(id: string) {
    return this.TypeRepository.findOne({
      where: {
        articles: {
          id
        }
      }
    })
  }

  public async getTypeParentById(id: string) {
    return await this.TypeRepository.createQueryBuilder('type')
      .select('rootType')
      .leftJoinAndSelect('type.rootType', 'rootType')
      .where('type.id = :id', { id })
      .getOne();
  }

  public async getTypeByName(name:string){
    return await this.TypeRepository.findOne({
      where:{
        name
      }
    })
  }

  public async createType(input: createTypeInput) {
    //增加
    const data = await getForeign(
      input,
      ['rootType', 'parentType'],
      [this.getTypeById.bind(this), this.getTypeById.bind(this)],
    );
    const newType = this.TypeRepository.create(data);
    await this.TypeRepository.save(newType);
  }

  public async deleteType(id:string) {
    //删除
    return await this.TypeRepository.delete(id)
  }

  public async updateType(input:updateTypeInput){
    //修改
    const {id,...rest} = await getForeign(
      input,
      ["rootType","parentType"],
      [this.getTypeById.bind(this),this.getTypeById.bind(this)]
    )
    return await this.TypeRepository.update(id,{
      ...rest
    })
  }
}
