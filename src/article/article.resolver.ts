import {
  Args,
  Int,
  Parent,
  Query,
  ResolveProperty,
  Resolver,
} from '@nestjs/graphql';
import { ArticleService } from './article.service';
import { Article } from './entity/article.entity';
import { ArticleAllModel } from './model/articleAll.model';
import { Tags } from '../tags/entity/tags.entity';
import { TagsService } from 'src/tags/tags.service';
import { UseGuards } from '@nestjs/common';
import { GraphQLAuthGuard } from 'src/shared/guard/graphql.auth.guard';

@Resolver(() => Article)
export class ArticleResolver {
  constructor(
    private readonly articleService: ArticleService,
    private readonly tagsService: TagsService,
  ) {}

  @Query(() => ArticleAllModel)
  @UseGuards(GraphQLAuthGuard)
  async getArticleAll(
    @Args({ name: 'limit', type: () => Int }) limit: number,
    @Args({ name: 'offset', type: () => Int }) offset: number,
  ) {
    const [articles, count] = await this.articleService.getArticleAll(
      limit,
      offset,
    );
    return {
      count,
      articles,
    };
  }

  @ResolveProperty()
  async tags(@Parent() article: Article) {
    const { id } = article;
    return await this.tagsService.ArticleTags(id);
  }
}
