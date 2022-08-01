import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveProperty,
  Resolver,
} from '@nestjs/graphql';
import { ArticleService } from './article.service';
import { Article } from './entity/article.entity';
import { ArticleAllModel } from './model/articleAll.model';
import { TagsService } from 'src/tags/tags.service';
import { UseGuards } from '@nestjs/common';
import { GraphQLAuthGuard } from 'src/shared/guard/graphql.auth.guard';
import { ArticleInsertInput } from './dto/article.insert.input';
import { StatusModel } from 'src/shared/model/status.modle';
import { ArticleUpdateInput } from './dto/article.update.input';

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
    const [articles, count] = await this.articleService.list(offset, limit);
    return {
      count,
      articles,
    };
  }

  @Query(() => Article)
  async getArticleById(@Args('id') id: string) {
    return this.articleService.Artilce(id);
  }

  @Mutation(() => Article)
  @UseGuards(GraphQLAuthGuard)
  async createArticle(
    @Args({
      name: 'articleInsertInput',
      type: () => ArticleInsertInput,
    })
    articleInsertInput,
  ) {
    console.log(articleInsertInput);
    return await this.articleService.insert(articleInsertInput);
  }

  @Mutation(() => StatusModel)
  @UseGuards(GraphQLAuthGuard)
  async deleteArticle(@Args('id') id: string) {
    await this.articleService.delete(id);
    return new StatusModel(200, '删除成功');
  }

  @Mutation(() => Article)
  @UseGuards(GraphQLAuthGuard)
  async updateArticle(@Args({
    name: 'input',
    type: () => ArticleUpdateInput
  }) input){
    return await this.articleService.update(input)
  }

  @ResolveProperty()
  async tags(@Parent() article: Article) {
    const { id } = article;
    return await this.tagsService.ArticleTags(id);
  }
}
