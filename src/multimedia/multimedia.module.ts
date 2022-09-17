import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagsModule } from 'src/tags/tags.module';
import { TypeModule } from 'src/type/type.module';
import { Multimedia } from './entity/multimedia.entity';
import { MultimediaResolver } from './multimedia.resolver';
import { MultimediaService } from './multimedia.service';

@Module({
  imports: [TypeOrmModule.forFeature([Multimedia]), TypeModule, TagsModule],
  providers: [MultimediaResolver, MultimediaService],
  exports: [MultimediaService],
})
export class MultimediaModule {}
