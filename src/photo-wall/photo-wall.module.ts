import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileUploadService } from 'src/shared/file-upload/file-upload.service';
import { Tags } from 'src/tags/entity/tags.entity';
import { TagsModule } from 'src/tags/tags.module';
import { TagsService } from 'src/tags/tags.service';
import { TypeModule } from 'src/type/type.module';
import { PhotoWall } from './entity/photo-wall.entity';
import { PhotoWallResolver } from './photo-wall.resolver';
import { PhotoWallService } from './photo-wall.service';

@Module({
  imports: [TypeOrmModule.forFeature([PhotoWall, Tags]),TypeModule,TagsModule],
  providers: [PhotoWallResolver, PhotoWallService, FileUploadService],
  exports: [PhotoWallService],
})
export class PhotoWallModule {}
