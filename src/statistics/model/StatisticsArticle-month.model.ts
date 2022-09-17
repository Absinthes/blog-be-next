import { ObjectType } from "@nestjs/graphql";
import { Article } from "src/article/entity/article.entity";

@ObjectType()
export class StatisticsArticleByMonth {
  year:number
  data?:ArticleByMonth[]
  length?:number
}

@ObjectType()
export class ArticleByMonth{
  month?:number
  data?:Article[]
}