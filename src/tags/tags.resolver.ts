import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PaginationQuerInput } from 'src/shared/dtos/paginationQuery.input';
import { GraphQLAuthGuard } from 'src/shared/guard/graphql.auth.guard';
import { StatusModel } from 'src/shared/model/status.modle';
import { TagsCreateInput } from './dtos/tags.create.input';
import { TagsUpdateInput } from './dtos/tags.update.input';
import { Tags } from './entity/tags.entity';
import { PaginatedTags } from './model/PaginatedTags.model';
import { TagsService } from './tags.service';

@Resolver()
export class TagsResolver {
  constructor(private readonly tagsService: TagsService) {}

  @Query(() => [Tags])
  // @UseGuards(GraphQLAuthGuard)
  public async getAllTag(@Args('type') type: number) {
    return await this.tagsService.allByType(type);
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
    type?,
  ) {
    let [ nodes, totalCount ] = await this.tagsService.list(paginationQuery, type);
    return new PaginatedTags(nodes, totalCount)
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
    return new StatusModel(200, '创建成功')
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
    await this.tagsService.update(input);
    return new StatusModel(200, '更新成功')
  }

  @Mutation(() => StatusModel)
  // @UseGuards(GraphQLAuthGuard)
  public async deleteTag(@Args('id') id: string) {
    await this.tagsService.delete(id);
    return new StatusModel(200, '删除成功');
  }
}
