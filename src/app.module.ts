import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphqlModule } from './graphql/graphql.module';
import { ConfigModule } from './config/config.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { ArticleModule } from './article/article.module';
import { TagsModule } from './tags/tags.module';
import { PhotoWallModule } from './photo-wall/photo-wall.module';
import { CommentModule } from './comment/comment.module';
import { LiveSharedModule } from './live-shared/live-shared.module';
import { MultimediaModule } from './multimedia/multimedia.module';
import { GroupModule } from './group/group.module';

@Module({
  imports: [
    ConfigModule,
    GraphqlModule,
    DatabaseModule,
    AuthModule,
    UserModule,
    ArticleModule,
    TagsModule,
    PhotoWallModule,
    CommentModule,
    LiveSharedModule,
    MultimediaModule,
    GroupModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
