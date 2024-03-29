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
import { FileUploadModule } from './shared/file-upload/file-upload.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { TypeModule } from './type/type.module';
import { FriendsChainModule } from './friends-chain/friends-chain.module';
import { FriendsChainTypeModule } from './friends-chain-type/friends-chain-type.module';
import { StatisticsModule } from './statistics/statistics.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../public'),
    }),
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
    FileUploadModule,
    TypeModule,
    FriendsChainModule,
    FriendsChainTypeModule,
    StatisticsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
