import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleService } from 'src/article/article.service';
import { Article } from 'src/article/entity/article.entity';
import { Tags } from 'src/tags/entity/tags.entity';
import { TagsService } from 'src/tags/tags.service';
import { Group } from './entity/group.entity';
import { GroupResolver } from './group.resolver';
import { GroupService } from './group.service';

@Module({
  imports: [TypeOrmModule.forFeature([Group, Article, Tags])],
  providers: [GroupService, GroupResolver, ArticleService, TagsService],
  exports: [GroupService]
})
export class GroupModule {}
