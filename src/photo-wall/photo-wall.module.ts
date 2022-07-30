import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhotoWall } from './entity/photo-wall.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PhotoWall])],
})
export class PhotoWallModule {}
