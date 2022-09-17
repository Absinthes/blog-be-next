import { Query, Resolver } from '@nestjs/graphql';
import { StatisticsArticleByMonth } from './model/StatisticsArticle-month.model';
import { StatisticsArticle } from './model/StatisticsArticle.model';
import { StatisticsService } from './statistics.service';

@Resolver()
export class StatisticsResolver {
  constructor(
    private readonly statisticsService:StatisticsService
  ){}

  @Query(() => [StatisticsArticle])
  public async statisArticleByYear(){
    return await this.statisticsService.statisArticleYear()
  }

  @Query(() => [StatisticsArticleByMonth])
  public async statisArticleByMonth(){
    return await this.statisticsService.statisArticleMonth()
  }
}
