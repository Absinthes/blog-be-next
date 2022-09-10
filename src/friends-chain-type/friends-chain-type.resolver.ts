import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { FriendsChainService } from 'src/friends-chain/friends-chain.service';
import { PaginationQuerInput } from 'src/shared/dtos/paginationQuery.input';
import { StatusModel } from 'src/shared/model/status.modle';
import { UpdateFriendsChainType } from './dto/friendChain.type.update.input';
import { FriendsChainType } from './entity/friends-chain-type.entity';
import { FriendsChainTypeService } from './friends-chain-type.service';
import { PaginatedFriendTypesChain } from './model/PaginatedFriendsChainType.model';

@Resolver(() => FriendsChainType)
export class FriendsChainTypeResolver {
  constructor(private readonly typeService: FriendsChainTypeService,
    private readonly friendChainService:FriendsChainService) {}

  @Query(() => [FriendsChainType])
  public async getAllType() {
    return await this.typeService.getAllTypeList();
  }

  @Query(() => PaginatedFriendTypesChain)
  public async getChainTypeList(
    @Args({ name: 'input', type: () => PaginationQuerInput }) input,
  ) {
    const res = await this.typeService.listType(input.offset, input.limit);
    return new PaginatedFriendTypesChain(...res);
  }

  @Mutation(() => StatusModel)
  public async deleteChainType(@Args({ name: 'id', type: () => String }) id) {
    await this.typeService.deleteType(id);
    return new StatusModel(200, '修改成功');
  }

  @Mutation(() => StatusModel)
  public async createChainType(
    @Args({ name: 'name', type: () => String }) name,
  ) {
    await this.typeService.createType(name);
    return new StatusModel(200, '添加成功');
  }

  @Mutation(() => StatusModel)
  public async updateChainType(
    @Args({ name: 'input', type: () => UpdateFriendsChainType }) input,
  ) {
    await this.typeService.updateType(input);
    return new StatusModel(200, '修改成功');
  }

  @ResolveField()
  public async friendsChains(@Parent() type: FriendsChainType) {
    return await this.friendChainService.getFriendChainByTypeId(type.id)
  }
}
