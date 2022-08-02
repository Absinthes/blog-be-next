import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQuerInput } from 'src/shared/dtos/paginationQuery.input';
import { Repository } from 'typeorm';
import { PhotoWall } from './entity/photo-wall.entity';

@Injectable()
export class PhotoWallService {
  constructor(
    @InjectRepository(PhotoWall)
    private readonly photoWallRepository:Repository<PhotoWall>
  ){}

  public async getPhotoWallbyPage(paginationQuer:PaginationQuerInput){

  }
}
