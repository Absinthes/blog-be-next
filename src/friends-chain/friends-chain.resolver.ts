import { Resolver, Query, Args, Mutation, ResolveField, Parent } from '@nestjs/graphql';
import { PaginationQuerInput } from 'src/shared/dtos/paginationQuery.input';
import { StatusModel } from 'src/shared/model/status.modle';
import { UpdateFriendsChainType } from './dto/friendChain.type.update.input';
import { CreateFriendsChainInput } from './dto/friendsChain.create.input';
import { FriendsChain } from './entity/friends-chain.entity';
import { FriendsChainService } from './friends-chain.service';
import { PaginatedFriendsChain } from './model/PaginatedFriendsChain.model';
import { PaginatedFriendTypesChain } from './model/PaginatedFriendsChainType.model';

@Resolver(() => FriendsChain)
export class FriendsChainResolver {
  constructor(
    private readonly friendsChainService: FriendsChainService,
    ) {}

  @Query(() => PaginatedFriendsChain)
  public async getFriendsChainList(
    @Args({ name: 'input', type: () => PaginationQuerInput }) input,
  ) {
    const res = await this.friendsChainService.list(input.offset, input.limit);
    return new PaginatedFriendsChain(...res);
  }

  @Query(() => FriendsChain)
  public async getAllFriendsChain(){
    return this.friendsChainService.all()
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

  @Query(() => PaginatedFriendTypesChain)
  public async getChainTypeList(
    @Args({name:"input",type:() => PaginationQuerInput}) input
  ){
    const res = await this.friendsChainService.listType(input.offset,input.limit);
    return new PaginatedFriendTypesChain(...res)
  }

  @Mutation(() => StatusModel)
  public async deleteChainType(@Args({name:"id",type:() => String}) id){
     await this.friendsChainService.deleteType(id)
     return new StatusModel(200,"修改成功")
  }

  @Mutation(() => StatusModel)
  public async createChainType(@Args({name:"name",type:() => String}) name){
    await this.friendsChainService.createType(name)
    return new StatusModel(200,"添加成功")
  }

  @Mutation(() => StatusModel)
  public async updateChainType(@Args({name:"input",type:() => UpdateFriendsChainType}) input){
    await this.friendsChainService.updateType(input)
    return new StatusModel(200,"修改成功")
  }

  @ResolveField()
  public async type(@Parent() friednChain:FriendsChain){
    return await this.friendsChainService.getTypeByFriendId(friednChain.id)
  }
}
