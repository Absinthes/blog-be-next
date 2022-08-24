import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { PaginationQuerInput } from 'src/shared/dtos/paginationQuery.input';
import { StatusModel } from 'src/shared/model/status.modle';
import { CreateFriendsChainInput } from './dto/friendsChain.create.input';
import { FriendsChainService } from './friends-chain.service';
import { PaginatedFriendsChain } from './model/PaginatedFriendsChain.model';

@Resolver()
export class FriendsChainResolver {
  constructor(private readonly friendsChainService: FriendsChainService) {}

  @Query(() => PaginatedFriendsChain)
  public async getFriendsChainList(
    @Args({ name: 'input', type: () => PaginationQuerInput }) input,
  ) {
    const res = await this.friendsChainService.list(input.offset, input.limit);
    return new PaginatedFriendsChain(...res);
  }

  @Mutation(() => StatusModel)
  public async createFriendsChain(
    @Args({ name: 'input', type: () => CreateFriendsChainInput }) input,
  ) {
    await this.friendsChainService.create(input);
    return new StatusModel(200, '添加成功');
  }

  @Mutation(() => StatusModel)
  public async deleteFriendsChain(@Args({ name: 'id', type: () => String }) id) {
    await this.friendsChainService.delete(id);
    return new StatusModel(200, '删除成功');
  }
}
