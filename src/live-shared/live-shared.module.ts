import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileUploadService } from 'src/shared/file-upload/file-upload.service';
import { Tags } from 'src/tags/entity/tags.entity';
import { TagsModule } from 'src/tags/tags.module';
import { TagsService } from 'src/tags/tags.service';
import { LiveShared } from './entity/live-shared.entity';
import { LiveSharedResolver } from './live-shared.resolver';
import { LiveSharedService } from './live-shared.service';

@Module({
  imports: [TypeOrmModule.forFeature([LiveShared, Tags]),TagsModule],
  providers: [
    LiveSharedService,
    LiveSharedResolver,
    FileUploadService,
  ],
  exports: [],
})
export class LiveSharedModule {}
