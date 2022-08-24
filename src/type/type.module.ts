import { Module } from '@nestjs/common';
import { TypeService } from './type.service';
import { TypeResolver } from './type.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Type } from './entity/type.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Type])],
  providers: [TypeService, TypeResolver],
  exports:[TypeService]
})
export class TypeModule {}
