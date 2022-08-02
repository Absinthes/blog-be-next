import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhotoWall } from './entity/photo-wall.entity';
import { PhotoWallResolver } from './photo-wall.resolver';
import { PhotoWallService } from './photo-wall.service';

@Module({
  imports: [TypeOrmModule.forFeature([PhotoWall])],
  providers: [PhotoWallResolver, PhotoWallService],
})
export class PhotoWallModule {}
