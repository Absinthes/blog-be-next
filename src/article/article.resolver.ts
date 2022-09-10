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
import { PaginatedArticle } from './model/PaginatedArticle.model';
import { CommentService } from 'src/comment/comment.service';
import { PaginationQuerInput } from 'src/shared/dtos/paginationQuery.input';
import { TypeService } from 'src/type/type.service';

@Resolver(() => Article)
export class ArticleResolver {
  constructor(
    private readonly articleService: ArticleService,
    private readonly tagsService: TagsService,
    private readonly groupService: GroupService,
    private readonly commentService: CommentService,
    private readonly typeService: TypeService,
  ) {}

  // @UseGuards(GraphQLAuthGuard)
  @Query(() => ArticleAllModel)
  public async getArticleList(
    @Args({ name: 'limit', type: () => Int, nullable: true }) limit?: number,
    @Args({ name: 'offset', type: () => Int, nullable: true }) offset?: number,
  ) {
    const [nodes, totalCount] = await this.articleService.list(offset, limit);
    const res = new PaginatedArticle(nodes, totalCount);
    return res;
  }

  @Query(() => Article)
  // @UseGuards(GraphQLAuthGuard)
  public async getArticleById(@Args('id') id: string) {
    return this.articleService.Artilce(id);
  }

  @Query(() => ArticleAllModel)
  public async getArticleByTagId(
    @Args('id') id: string,
    @Args({
      name: 'pagination',
      type: () => PaginationQuerInput,
      nullable: true,
    })
    pagination?,
  ) {
    const [nodes, totalCount] = await this.articleService.articleByTagId(
      id,
      pagination,
    );
    console.log(id, nodes, totalCount, pagination);
    return new PaginatedArticle(nodes, totalCount);
  }

  @Query(() => ArticleAllModel)
  public async getArticleByTypeId(
    @Args('id') id: string,
    @Args({
      name: 'isRoot',
      nullable: true,
    })
    isRoot: boolean,
    @Args({
      name: 'pagination',
      type: () => PaginationQuerInput,
      nullable: true,
    })
    pagination?,
  ) {
    const [nodes, totalCount] = await this.articleService.articleByTypeId(
      id,
      isRoot,
      pagination,
    );
    return new PaginatedArticle(nodes, totalCount);
  }

  @Query(() => ArticleAllModel)
  public async getArticleSticky(
    @Args({
      name: 'input',
      type: () => PaginationQuerInput,
    })
    input,
  ) {
    const { limit, offset } = input as PaginationQuerInput;
    const stickyList = await this.articleService.sticky();
    const [unStickList, totalCount] = await this.articleService.unStickyList(
      offset,
      limit,
    );
    return new PaginatedArticle(stickyList.concat(unStickList), totalCount);
  }

  @Query(() => [Article])
  public async getArticleTop() {
    return this.articleService.sticky()
  }

  @Mutation(() => StatusModel)
  // @UseGuards(GraphQLAuthGuard)
  public async createArticle(
    @Args({
      name: 'articleInsertInput',
      type: () => ArticleInsertInput,
    })
    articleInsertInput,
  ) {
    await this.articleService.insert(articleInsertInput);
    return new StatusModel(200, '创建成功');
  }

  @Mutation(() => StatusModel)
  // @UseGuards(GraphQLAuthGuard)
  public async deleteArticle(@Args('id') id: string) {
    await this.articleService.delete(id);
    return new StatusModel(200, '删除成功');
  }

  @Mutation(() => StatusModel)
  // @UseGuards(GraphQLAuthGuard)
  public async updateArticle(
    @Args({
      name: 'input',
      type: () => ArticleUpdateInput,
    })
    input,
  ) {
    await this.articleService.update(input);
    return new StatusModel(200, '更新成功');
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

  @ResolveField()
  async type(@Parent() article: Article) {
    const { id } = article;
    return await this.typeService.getTypeByArticleId(id);
  }
}
