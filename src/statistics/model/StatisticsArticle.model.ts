import { ObjectType } from "@nestjs/graphql";
import { Article } from "src/article/entity/article.entity";

@ObjectType()
export class StatisticsArticle {
  year:number
  data?:Article[]
  length?:number
}