import { Injectable } from '@nestjs/common';
import { ArticleService } from 'src/article/article.service';
import { Article } from 'src/article/entity/article.entity';
import { StatisticsArticleByMonth } from './model/StatisticsArticle-month.model';
import { StatisticsArticle } from './model/StatisticsArticle.model';

@Injectable()
export class StatisticsService {
  constructor(
    private readonly articleService:ArticleService
  ){}

  public async statisArticleYear(){
    let start:Article | number  = await this.articleService.articleByNewOrLastCreatTime("ASC")
    let end:Article | number = await this.articleService.articleByNewOrLastCreatTime("DESC")
    start = new Date(start.createTime).getFullYear()
    end = new Date(end.createTime).getFullYear()
    let data:StatisticsArticle[] = []
    for(let i = start;i <= end;i++){
      const res = await this.articleService.articleByYear(i)
      data.push({
        year:i,
        data:res,
        length:res.length
      })
    }
    return data
  }

  public async statisArticleMonth(){
    let start:Article | number  = await this.articleService.articleByNewOrLastCreatTime("ASC")
    let end:Article | number = await this.articleService.articleByNewOrLastCreatTime("DESC")
    start = new Date(start.createTime).getFullYear()
    end = new Date(end.createTime).getFullYear()
    let data:StatisticsArticleByMonth[] = []
    for(let year = start;year <= end;year++){
      const months = []
      for(let month = 1;month <= 12;month++){
        const res = await this.articleService.articleByMonth(year,month)
        if(res.length == 0) continue
        months.push({
          month,
          data:res
        })
      }
      data.push({
        year,
        data:months
      })
    }
    return data
  }

}
