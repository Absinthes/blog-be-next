import { ObjectType } from "@nestjs/graphql";
import { Paginated } from "src/shared/model/Paginated.model";
import { Article } from "../entity/article.entity";
import { ArticleModel } from "./ArticleModel";

@ObjectType()
export class PaginatedArticle extends Paginated(ArticleModel){
  
}