import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { PaginationQuerInput } from 'src/shared/dtos/paginationQuery.input';
import { StatusModel } from 'src/shared/model/status.modle';
import { createTypeInput } from './dtos/createType.input';
import { Type } from './entity/type.entity';
import { TypeService } from './type.service';

@Resolver(() => Type)
export class TypeResolver {
  constructor(
    private readonly typeService:TypeService
  ){}

  @Query(() => [Type])
  public async getTypeByRoot(@Args({name:"input",type: () => PaginationQuerInput}) input){
    const res =  await this.typeService.getTypeByRoot(input.offset,input.limit);
    console.log(res)
    return res;
  }

  @Mutation(() => StatusModel)
  public async createType(@Args({name:"input",type:() => createTypeInput}) input){
    await this.typeService.createType(input)
    return new StatusModel(200,"创建成功")
  }

  @ResolveField()
  public async rootType(@Parent() type:Type){
    if("rootType" in type){
      return type.rootType
    }
    return null
  }

  @ResolveField()
  public async parentType(@Parent() type:Type){
    return type.parentType || null
  }

  @ResolveField()
  public async childType(@Parent() type:Type){
    return type.childType || null
  }

  @ResolveField()
  public async hasChildren(@Parent() type:Type){
    return false
  }

}
