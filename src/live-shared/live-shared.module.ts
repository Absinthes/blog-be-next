import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LiveShared } from './entity/live-shared.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LiveShared])],
})
export class LiveSharedModule {}
