import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from 'src/config/config.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        ...configService.getMySQLDataKey(),
        autoLoadEntities: true,
        synchronize: true,
        logging: ['query'],
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
