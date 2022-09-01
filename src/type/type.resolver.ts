import { NotAcceptableException } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { ArticleService } from 'src/article/article.service';
import { PaginationQuerInput } from 'src/shared/dtos/paginationQuery.input';
import { StatusModel } from 'src/shared/model/status.modle';
import { createTypeInput } from './dtos/createType.input';
import { updateTypeInput } from './dtos/updateType.input';
import { Type } from './entity/type.entity';
import { TypeAndCount } from './model/TypeAndCount.model';
import { TypeService } from './type.service';

@Resolver(() => Type)
export class TypeResolver {
  constructor(
    private readonly typeService: TypeService,
    private readonly articleService: ArticleService,
  ) {}

  @Query(() => TypeAndCount)
  public async getTypeByRoot(
    @Args({ name: 'input', type: () => PaginationQuerInput, nullable: true })
    input,
  ) {
    //获取根分类
    const res = await this.typeService.getTypeByRoot(input?.offset, input?.limit);
    return new TypeAndCount(...res);
  }

  @Query(() => Type)
  public async getTypeById(@Args({ name: 'id', type: () => String }) id) {
    return await this.typeService.getTypeById(id, [
      'childType',
      'parentType',
      'rootType',
    ]);
  }

  @Query(() => Type)
  public async getTypeByNameAndRoot(
    @Args({ name: 'name', type: () => String }) name,
  ) {
    return (await this.typeService.getTypeByName(name)) || {};
  }

  @Mutation(() => StatusModel)
  public async createType(
    @Args({ name: 'input', type: () => createTypeInput }) input,
  ) {
    //新增分类
    const origin = await this.typeService.getTypeByName(input.name);
    if (origin) throw new NotAcceptableException(`类型:${input.name},已存在`);
    await this.typeService.createType(input);
    return new StatusModel(200, '创建成功');
  }

  @Mutation(() => StatusModel)
  public async deleteType(@Args({ name: 'id', type: () => String }) id) {
    //删除分类
    await this.typeService.deleteType(id);
    return new StatusModel(200, '删除成功');
  }

  @Mutation(() => StatusModel)
  public async updateType(
    @Args({ name: 'input', type: () => updateTypeInput }) input,
  ) {
    //修改分类
    await this.typeService.updateType(input);
    return new StatusModel(200, '修改成功');
  }

  @ResolveField()
  async rootType(@Parent() type: Type) {
    if (type.rootType) return type.rootType;
    const curType = await this.typeService.getTypeById(type.id, ['rootType']);
    return curType.rootType;
  }

  @ResolveField()
  async parentType(@Parent() type: Type) {
    if (type.parentType) return type.parentType;
    const curType = await this.typeService.getTypeById(type.id, ['parentType']);
    return curType.parentType;
  }

  @ResolveField()
  async childType(@Parent() type: Type) {
    if (type.childType) return type.childType;
    const curType = await this.typeService.getTypeById(type.id, ['childType']);
    return curType.childType;
  }

  @ResolveField()
  async hasChildren(@Parent() type: Type) {
    return type.childType && type.childType.length == 0;
  }

  @ResolveField()
  async articles(@Parent() type: Type) {
    const { id } = type;
    const [nodes] = await this.articleService.articleByTypeId(id);
    return nodes;
  }
}
