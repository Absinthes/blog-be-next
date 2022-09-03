import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentModule } from 'src/comment/comment.module';
import { CommentService } from 'src/comment/comment.service';
import { Comment } from 'src/comment/entity/comment.entity';
import { Group } from 'src/group/entity/group.entity';
import { GroupModule } from 'src/group/group.module';
import { GroupService } from 'src/group/group.service';
import { FileUploadModule } from 'src/shared/file-upload/file-upload.module';
import { Tags } from 'src/tags/entity/tags.entity';
import { TagsModule } from 'src/tags/tags.module';
import { TagsService } from 'src/tags/tags.service';
import { TypeModule } from 'src/type/type.module';
import { ArticleResolver } from './article.resolver';
import { ArticleService } from './article.service';
import { Article } from './entity/article.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Article]),
    FileUploadModule,
    forwardRef(() => TagsModule),
    forwardRef(() => GroupModule),
    forwardRef(() => CommentModule),
    forwardRef(() => TypeModule)
  ],
  providers: [
    ArticleService,
    ArticleResolver,
  ],
  exports: [ArticleService],
})
export class ArticleModule {}
