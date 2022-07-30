import { Field, ObjectType } from "@nestjs/graphql";
import { Article } from "../entity/article.entity";

@ObjectType()
export class ArticleAllModel {
  @Field()
  count: number

  @Field(() => [Article])
  articles: Article[]
}