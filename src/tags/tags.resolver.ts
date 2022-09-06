import { UseGuards } from '@nestjs/common';
import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { ArticleService } from 'src/article/article.service';
import { PaginationQuerInput } from 'src/shared/dtos/paginationQuery.input';
import { GraphQLAuthGuard } from 'src/shared/guard/graphql.auth.guard';
import { StatusModel } from 'src/shared/model/status.modle';
import { TagsCreateInput } from './dtos/tags.create.input';
import { TagsUpdateInput } from './dtos/tags.update.input';
import { Tags } from './entity/tags.entity';
import { PaginatedTags } from './model/PaginatedTags.model';
import { TagsService } from './tags.service';

@Resolver(() => Tags)
export class TagsResolver {
  constructor(
    private readonly tagsService: TagsService,
    private readonly articleService: ArticleService,
  ) {}

  @Query(() => [Tags])
  // @UseGuards(GraphQLAuthGuard)
  public async getAllTagByTypeId(@Args('type') typeId?: string) {
    return await this.tagsService.allByTypeId(typeId);
  }

  @Query(() => [Tags])
  // @UseGuards(GraphQLAuthGuard)
  public async getAllTagByTypeName(@Args('name') name?: string) {
    return await this.tagsService.allByTypeName(name);
  }

  @Query(() => [Tags])
  public async getAllTag(){
    return await this.tagsService.all()
  }

  // @UseGuards(GraphQLAuthGuard)
  @Query(() => PaginatedTags)
  public async getTagsList(
    @Args({
      name: 'paginationQuery',
      type: () => PaginationQuerInput,
    })
    paginationQuery,
    @Args({
      name: 'type',
      type: () => Int,
      nullable: true,
    })
    type?
  ) {
    let [nodes, totalCount] = await this.tagsService.list(
      paginationQuery,
      type,
    );
    return new PaginatedTags(nodes, totalCount);
  }

  @Query(() => [Tags])
  public async getTagByVagueName(
    @Args({ name: 'name', type: () => String }) name,
  ) {
    return await this.tagsService.nameVague(name);
  }

  @Mutation(() => StatusModel)
  // @UseGuards(GraphQLAuthGuard)
  public async createTag(
    @Args({
      name: 'input',
      type: () => TagsCreateInput,
    })
    input,
  ) {
    await this.tagsService.create(input);
    return new StatusModel(200, '创建成功');
  }

  @Mutation(() => StatusModel)
  // @UseGuards(GraphQLAuthGuard)
  public async updateTag(
    @Args({
      name: 'input',
      type: () => TagsUpdateInput,
    })
    input,
  ) {
    console.log(input)
    // await this.tagsService.update(input);
    return new StatusModel(200, '更新成功');
  }

  @Mutation(() => StatusModel)
  // @UseGuards(GraphQLAuthGuard)
  public async deleteTag(@Args('id') id: string) {
    await this.tagsService.delete(id);
    return new StatusModel(200, '删除成功');
  }

  @ResolveField()
  async articles(@Parent() tag: Tags) {
    const { id } = tag;
    let [nodes] =  await this.articleService.articleByTagId(id);
    return nodes
  }

  @Mutation(() => StatusModel)
  async createTagType(@Args({name:"name",type:() => String}) name){
    await this.tagsService.createTagType(name)
    return new StatusModel(200,"创建成功")
  }

  @Mutation(() => StatusModel)
  async deleteTagType(@Args({name:"id",type:() => String}) id){
    await this.tagsService.deleteTagType(id)
    return new StatusModel(200,"删除成功")
  }

  @ResolveField()
  async type(@Parent() tag:Tags){
    let res =  await this.tagsService.getTagTypeByTagId(tag.id)
    return res
  }
}
