import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileUploadService } from 'src/shared/file-upload/file-upload.service';
import { Tags } from 'src/tags/entity/tags.entity';
import { TagsService } from 'src/tags/tags.service';
import { TypeModule } from 'src/type/type.module';
import { PhotoWall } from './entity/photo-wall.entity';
import { PhotoWallResolver } from './photo-wall.resolver';
import { PhotoWallService } from './photo-wall.service';

@Module({
  imports: [TypeOrmModule.forFeature([PhotoWall, Tags]),TypeModule],
  providers: [PhotoWallResolver, PhotoWallService, FileUploadService, TagsService],
  exports: [PhotoWallService],
})
export class PhotoWallModule {}
