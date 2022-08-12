import { Field, ObjectType } from "@nestjs/graphql";
import { Article } from "../entity/article.entity";

@ObjectType()
export class ArticleAllModel {
  totalCount: number
  nodes: Article[]
}