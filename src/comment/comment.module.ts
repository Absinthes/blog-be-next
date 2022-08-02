import { CommentService } from './comment.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entity/comment.entity';
import { CommentResolver } from './comment.resolver';
import { ArticleModule } from 'src/article/article.module';

@Module({
  imports: [TypeOrmModule.forFeature([Comment]),ArticleModule],
  providers: [CommentService, CommentResolver],
})
export class CommentModule {}
