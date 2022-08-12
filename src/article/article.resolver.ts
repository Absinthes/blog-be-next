import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
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
import { GroupService } from 'src/group/group.service';
import { PaginatedArticle } from './model/PaginatedArticle';
import { CommentService } from 'src/comment/comment.service';

@Resolver(() => Article)
export class ArticleResolver {
  constructor(
    private readonly articleService: ArticleService,
    private readonly tagsService: TagsService,
    private readonly groupService: GroupService,
    private readonly commentService: CommentService,
  ) {}

  // @UseGuards(GraphQLAuthGuard)
  @Query(() => ArticleAllModel)
  public async getArticleList(
    @Args({ name: 'limit', type: () => Int }) limit: number,
    @Args({ name: 'offset', type: () => Int }) offset: number,
  ) {
    const [nodes, totalCount] = await this.articleService.list(offset, limit);
    const res = new PaginatedArticle(nodes, totalCount);
    return res
  }

  @Query(() => Article)
  // @UseGuards(GraphQLAuthGuard)
  public async getArticleById(@Args('id') id: string) {
    return this.articleService.Artilce(id);
  }

  @Mutation(() => Article)
  // @UseGuards(GraphQLAuthGuard)
  public async createArticle(
    @Args({
      name: 'articleInsertInput',
      type: () => ArticleInsertInput,
    })
    articleInsertInput,
  ) {
    return await this.articleService.insert(articleInsertInput);
  }

  @Mutation(() => StatusModel)
  // @UseGuards(GraphQLAuthGuard)
  public async deleteArticle(@Args('id') id: string) {
    await this.articleService.delete(id);
    return new StatusModel(200, '删除成功');
  }

  @Mutation(() => Article)
  // @UseGuards(GraphQLAuthGuard)
  public async updateArticle(
    @Args({
      name: 'input',
      type: () => ArticleUpdateInput,
    })
    input,
  ) {
    return await this.articleService.update(input);
  }

  @ResolveField()
  async tags(@Parent() article: Article) {
    const { id } = article;
    return await this.tagsService.ArticleTags(id);
  }

  @ResolveField()
  async groups(@Parent() article: Article) {
    const { id } = article;
    return await this.groupService.articleGroup(id);
  }

  @ResolveField()
  async comments(@Parent() article: Article) {
    const { id } = article;
    let [comments] = await this.commentService.getCommentByArticleId(id);
    return comments;
  }
}
