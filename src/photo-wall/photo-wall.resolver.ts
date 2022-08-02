import { Query } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { PhotoWall } from './entity/photo-wall.entity';
import { PhotoWallService } from './photo-wall.service';

@Resolver()
export class PhotoWallResolver {
  constructor(
    private readonly photoWallService:PhotoWallService
  ){}

  
}
