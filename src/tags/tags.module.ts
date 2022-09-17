import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleModule } from 'src/article/article.module';
import { MultimediaModule } from 'src/multimedia/multimedia.module';
import { TagType } from './entity/tag.type.entity';
import { Tags } from './entity/tags.entity';
import { TagsResolver } from './tags.resolver';
import { TagsService } from './tags.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tags, TagType]),
    forwardRef(() => ArticleModule),
  ],
  providers: [TagsService, TagsResolver],
  exports: [TagsService],
})
export class TagsModule {}
