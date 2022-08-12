import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentService } from 'src/comment/comment.service';
import { Comment } from 'src/comment/entity/comment.entity';
import { Group } from 'src/group/entity/group.entity';
import { GroupService } from 'src/group/group.service';
import { Tags } from 'src/tags/entity/tags.entity';
import { TagsService } from 'src/tags/tags.service';
import { ArticleResolver } from './article.resolver';
import { ArticleService } from './article.service';
import { Article } from './entity/article.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Article, Tags, Group, Comment])],
  providers: [ArticleService, ArticleResolver, TagsService, GroupService, CommentService],
  exports: [ArticleService],
})
export class ArticleModule {}
