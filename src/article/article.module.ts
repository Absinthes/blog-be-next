import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tags } from 'src/tags/entity/tags.entity';
import { TagsService } from 'src/tags/tags.service';
import { ArticleResolver } from './article.resolver';
import { ArticleService } from './article.service';
import { Article } from './entity/article.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Article, Tags])],
  providers: [ArticleService, ArticleResolver, TagsService],
  exports: [ArticleService],
})
export class ArticleModule {}
