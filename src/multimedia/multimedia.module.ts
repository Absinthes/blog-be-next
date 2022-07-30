import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Multimedia } from './entity/multimedia.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ Multimedia ])]
})
export class MultimediaModule {}
