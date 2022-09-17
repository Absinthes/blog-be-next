import { Module } from '@nestjs/common';
import { ArticleModule } from 'src/article/article.module';
import { StatisticsResolver } from './statistics.resolver';
import { StatisticsService } from './statistics.service';

@Module({
  imports:[ArticleModule],
  providers: [StatisticsResolver, StatisticsService],
  exports:[StatisticsService]
})
export class StatisticsModule {}
