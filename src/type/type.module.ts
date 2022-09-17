import { forwardRef, Module } from '@nestjs/common';
import { TypeService } from './type.service';
import { TypeResolver } from './type.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Type } from './entity/type.entity';
import { ArticleModule } from 'src/article/article.module';
import { MultimediaModule } from 'src/multimedia/multimedia.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Type]),
    forwardRef(() => ArticleModule),
  ],
  providers: [TypeService, TypeResolver],
  exports: [TypeService],
})
export class TypeModule {}
