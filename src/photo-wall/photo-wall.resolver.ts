import {
  Args,
  Resolver,
  Query,
  Mutation,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { PaginationQuerInput } from 'src/shared/dtos/paginationQuery.input';
import { FileSuccessModel } from 'src/shared/file-upload/model/fileSuccess.model';
import { StatusModel } from 'src/shared/model/status.modle';
import { TagsService } from 'src/tags/tags.service';
import { CreatePhotoInput } from './dtos/createPhoto.input';
import { UpdatePhotoWallInput } from './dtos/updatePhotoWall.input';
import { PhotoWall } from './entity/photo-wall.entity';
import { PaginatedPhotoWall } from './model/PaginatedPhotoWall.model';
import { PhotoWallService } from './photo-wall.service';

@Resolver(() => PhotoWall)
export class PhotoWallResolver {
  constructor(
    private readonly photoWallService: PhotoWallService,
    private readonly tagsService: TagsService,
  ) {}

  @Query(() => PaginatedPhotoWall)
  public async getPhotoWallList(
    @Args({ name: 'input', type: () => PaginationQuerInput }) input,
  ) {
    let [nodes, totalCount] = await this.photoWallService.list(
      input,
    );
    return new PaginatedPhotoWall(nodes, totalCount);
  }

  @Query(() => PhotoWall)
  public async getPhotoWallById(@Args('id') id: string) {
    return await this.photoWallService.one(id)
  }

  @Mutation(() => PhotoWall)
  public async addPhotoToWall(
    @Args({
      name: 'createPhotoInput',
      type: () => CreatePhotoInput,
    })
    createPhotoInput,
  ) {
    return await this.photoWallService.create(createPhotoInput);
  }

  @Mutation(() => StatusModel)
  public async addPhotoWallList(
    @Args({
      name: 'createPhotoList',
      type: () => [CreatePhotoInput],
    })
    createPhotoList,
  ) {
    for (let i = 0; i < createPhotoList.length; i++) {
      const it: CreatePhotoInput = createPhotoList[i];
      await this.photoWallService.create(it);
    }
    return new StatusModel(200, '上传成功');
  }

  @Mutation(() => StatusModel)
  public async deletePhotoWall(@Args('id') id: string) {
    await this.photoWallService.delete(id);
    return new StatusModel(200, '删除成功');
  }

  @Mutation(() => StatusModel)
  public async updatePhotoWall(
    @Args({
      name: 'updateInput',
      type: () => UpdatePhotoWallInput,
    })
    updateInput,
  ) {
    await this.photoWallService.update(updateInput);
    return new StatusModel(200, '修改成功');
  }

  @ResolveField()
  public async tags(@Parent() photoWall: PhotoWall) {
    const { id } = photoWall;
    return await this.tagsService.photoWallTags(id);
  }
}
