import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tags } from './entity/tags.entity';
import { TagsResolver } from './tags.resolver';
import { TagsService } from './tags.service';

@Module({
  imports: [TypeOrmModule.forFeature([Tags])],
  providers: [TagsService, TagsResolver],
  exports: [TagsService],
})
export class TagsModule {}
