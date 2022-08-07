import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { PaginationQuerInput } from 'src/shared/dtos/paginationQuery.input';
import { StatusModel } from 'src/shared/model/status.modle';
import { TagsService } from 'src/tags/tags.service';
import { CreateLiveSharedInput } from './dtos/createLiveShared.input';
import { UpdateLiveSharedInput } from './dtos/updateLiveShared.input';
import { LiveShared } from './entity/live-shared.entity';
import { LiveSharedService } from './live-shared.service';

@Resolver(() => LiveShared)
export class LiveSharedResolver {
  constructor(
    private readonly liveSharedService: LiveSharedService,
    private readonly tagsService: TagsService,
  ) {}

  @Query(() => LiveShared)
  public async getLiveSharedById(@Args('id') id: string) {
    return await this.liveSharedService.one(id);
  }

  @Query(() => [LiveShared])
  public async getLiveSharedList(
    @Args({
      name: 'paginationQuery',
      type: () => PaginationQuerInput,
    })
    paginationQuery,
  ) {
    return await this.liveSharedService.list(paginationQuery);
  }

  @Mutation(() => StatusModel)
  public async createLiveShared(
    @Args({
      name: 'createLiveShared',
      type: () => CreateLiveSharedInput,
    })
    createLiveShared,
  ) {
    await this.liveSharedService.create(createLiveShared);
    return new StatusModel(200, '创建成功');
  }

  @Mutation(() => StatusModel)
  public async updateLiveShared(
    @Args({
      name: 'updateLiveShared',
      type: () => UpdateLiveSharedInput,
    })
    updateLiveShared,
  ) {
    await this.liveSharedService.update(updateLiveShared);
    return new StatusModel(200, '更新成功');
  }

  @Mutation(() => StatusModel)
  public async deleteLiveShared(@Args('id') id: string) {
    await this.liveSharedService.delete(id);
    return new StatusModel(200, '删除成功');
  }

  @ResolveField()
  private async tags(@Parent() liveShared: LiveShared) {
    const { id } = liveShared;
    return await this.tagsService.liveSharedTags(id);
  }
}
