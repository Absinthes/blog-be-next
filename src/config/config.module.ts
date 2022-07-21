import { ConfigService } from './config.service';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  providers: [
    {
      provide: ConfigService,
      useValue: new ConfigService([`env/${process.env.NODE_ENV || 'development'}.env`])
    }
  ],
  exports: [ConfigService],
})
export class ConfigModule {}
