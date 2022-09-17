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
import { TypeService } from 'src/type/type.service';
import { MultimediaCreateInput } from './dtos/multimedia.create.input';
import { MultimediaUpdateInput } from './dtos/multimedia.update.input';
import { Multimedia } from './entity/multimedia.entity';
import { MultimediaAndCount } from './model/MultimediaAndCount.model';
import { MultimediaService } from './multimedia.service';

@Resolver(() => Multimedia)
export class MultimediaResolver {
  constructor(
    private readonly multimediaService: MultimediaService,
    private readonly typeService: TypeService,
    private readonly tagsService: TagsService
  ) {}

  @Query(() => MultimediaAndCount)
  public async getMultimediaList(
    @Args({
      name: 'input',
      type: () => PaginationQuerInput,
      nullable: true,
    })
    input,
    @Args({
      name: 'typeName',
      type: () => String,
      nullable: true,
    })
    typeName?,
  ) {
    const { limit, offset } = input as PaginationQuerInput;
    const [nodes, totalCount] = await this.multimediaService.list(
      limit,
      offset,
      typeName,
    );
    return new MultimediaAndCount(nodes, totalCount);
  }

  @Query(() => Multimedia)
  public async getMultimediaById(@Args('id') id: string) {
    return await this.multimediaService.one(id);
  }

  @Mutation(() => StatusModel)
  public async createMultimedia(
    @Args({
      name: 'input',
      type: () => MultimediaCreateInput,
    })
    input,
  ) {
    await this.multimediaService.create(input);
    return new StatusModel(200, '创建成功');
  }

  @Mutation(() => StatusModel)
  public async updateMultimedia(
    @Args({
      name: 'input',
      type: () => MultimediaUpdateInput,
    })
    input,
  ) {
    await this.multimediaService.update(input);
    return new StatusModel(200, '更新成功');
  }

  @Mutation(() => StatusModel)
  public async deleteMultimedia(@Args('id') id: string) {
    await this.multimediaService.deleted(id);
    return new StatusModel(200, '删除成功');
  }

  @ResolveField()
  async type(@Parent() multimedia: Multimedia) {
    const { id } = multimedia;
    return await this.typeService.getTypeByMultimediaId(id);
  }

  @ResolveField()
  async tags(@Parent() multimedia: Multimedia){
    const {id} = multimedia
    return await this.tagsService.multimediaTags(id)
  }
}
