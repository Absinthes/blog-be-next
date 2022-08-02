import { Args, Resolver,Query } from '@nestjs/graphql';
import { PaginationQuerInput } from 'src/shared/dtos/paginationQuery.input';
import { StatusModel } from 'src/shared/model/status.modle';
import { PhotoWall } from './entity/photo-wall.entity';
import { PaginatedPhotoWall } from './model/PaginatedPhotoWall.model';
import { PhotoWallService } from './photo-wall.service';

@Resolver()
export class PhotoWallResolver {
  constructor(private readonly photoWallService: PhotoWallService) {}

  @Query(() => StatusModel)
  public async getPhotoWall(
    @Args({ name: 'input', type: () => PaginationQuerInput }) input,
  ) {
    let [nodes,totalCount] = await this.photoWallService.getPhotoWallbyPage(input)
    console.log(totalCount)
    return new StatusModel(200,"ok")
  }

  @Query(() => StatusModel)
  public async createPhoto(){

  }
}
