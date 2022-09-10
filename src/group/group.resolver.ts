import {
  Args,
  ID,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  ResolveProperty,
  Resolver,
} from '@nestjs/graphql';
import { ArticleService } from 'src/article/article.service';
import { PaginationQuerInput } from 'src/shared/dtos/paginationQuery.input';
import { StatusModel } from 'src/shared/model/status.modle';
import { GroupCreateInput } from './dtos/group.create.input';
import { GroupUpdateInput } from './dtos/group.update.input';
import { Group } from './entity/group.entity';
import { GroupService } from './group.service';
import { PaginatedGroup } from './model/PaginatedGroup.model';

@Resolver(() => Group)
export class GroupResolver {
  constructor(
    private readonly groupService: GroupService,
    private readonly articleService: ArticleService,
  ) {}

  @Query(() => PaginatedGroup)
  public async getGroupList(
    @Args({
      name: 'input',
      type: () => PaginationQuerInput,
    })
    input,
  ) {
    const [nodes, totalCount] = await this.groupService.list(input);
    return new PaginatedGroup(nodes, totalCount);
  }

  @Query(() => Group)
  public async getGroupById(
    @Args({
      name: 'id',
      type: () => Int,
    })
    id,
  ) {
    return await this.groupService.group(id);
  }

  @Query(() => [Group])
  public async getGroupByVagueName(
    @Args({ name: 'name', type: () => String }) name,
  ) {
    return await this.groupService.nameVague(name);
  }

  @Mutation(() => StatusModel)
  public async createGroup(
    @Args({
      name: 'input',
      type: () => GroupCreateInput,
    })
    input,
  ) {
    await this.groupService.create(input);
    return new StatusModel(200, '创建成功');
  }

  @Mutation(() => StatusModel)
  public async updateGroup(
    @Args({
      name: 'input',
      type: () => GroupUpdateInput,
    })
    input,
  ) {
    await this.groupService.update(input);
    return new StatusModel(200, '更新成功');
  }

  @Mutation(() => StatusModel)
  public async deleteGroup(
    @Args({
      name: 'id',
      type: () => ID,
    })
    id,
  ) {
    await this.groupService.delete(id);
    return new StatusModel(200, '删除成功');
  }

  @ResolveField()
  public async articles(@Parent() group: Group) {
    const { id } = group;
    return await this.articleService.articleGroup(id);
  }
}
