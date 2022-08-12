import { Resolver, Query, Args, Mutation, ResolveField, Parent } from '@nestjs/graphql';
import { CommentService } from './comment.service';
import { CommnetAndCount } from './model/commnetAndCount.model';
import { Comment } from './entity/comment.entity';
import { createCommentInput } from './dtos/createComment.input';
import { StatusModel } from 'src/shared/model/status.modle';
import { updateCommentInput } from './dtos/updateComment.input';
import {PaginationQuerInput} from "../shared/dtos/paginationQuery.input"
import { UseGuards } from '@nestjs/common';
import { GraphQLAuthGuard } from 'src/shared/guard/graphql.auth.guard';

@Resolver(() => Comment)
export class CommentResolver {
  private chidrenCommentLength = new Map<string,number>()

  constructor(private readonly commentService: CommentService) {}

  @Query(() => CommnetAndCount)
  public async getCommentByArticleId(@Args('ariticleId') ariticleId: string) {
    //根据文章id获取评论
    const res = await this.commentService.getCommentByArticleId(ariticleId);
    return new CommnetAndCount(...res);
  }

  @Query(() => Comment)
  public async getCommentByID(
    @Args({name:"id",type:() => String}) id
  ){
    //根据评论id获取评论信息
    return await this.commentService.getCommentById(id)
  }

  @Mutation(() => StatusModel)
  public async createComment(
    @Args({ name: 'comment', type: () => createCommentInput }) comment,
  ) {
    //创建评论
    await this.commentService.createComment(comment);
    return new StatusModel(200, '创建成功');
  }

  @Mutation(() => StatusModel)
  // @UseGuards(GraphQLAuthGuard)
  public async updateComment(
    @Args({ name: 'comment', type: () => updateCommentInput }) comment,
  ) {
    //更新评论
    await this.commentService.updateComment(comment);
    return new StatusModel(200, `修改成功!`);
  }

  @Mutation(() => StatusModel)
  // @UseGuards(GraphQLAuthGuard)
  public async deleteComment(
    @Args({ name: 'id', type: () => String}) id
  ) {
    //删除评论
    await this.commentService.deleteComment(id);
    return new StatusModel(200, '删除成功');
  }

  @Query(() => CommnetAndCount)
  public async getCommnet(@Args({name:"input",type: () => PaginationQuerInput}) input){
    //分页获取评论
    const res =  await this.commentService.getComment(input.offset || 1,input.limit || 10)
    return new CommnetAndCount(...res)
  }

  @Query(() => CommnetAndCount)
  public async getCommentByRoot(@Args({name:"input",type: () => PaginationQuerInput}) input){
    //根据主评论进行查询
    const res = await this.commentService.getCommentByRoot(input.offset,input.limit);
    return new CommnetAndCount(...res)
  }

  @ResolveField()
  public async article(@Parent() comment:Comment){
    return comment.article  
  }

  @ResolveField()
  public async rootComment(@Parent() comment:Comment){
    if(comment.rootComment){
      return comment.rootComment
    }
    const curComment = await this.commentService.getCommentById(comment.id,['rootComment']);
    return curComment.rootComment
  }

  @ResolveField()
  public async parentComment(@Parent() comment:Comment){
    if(comment.parentComment){
      return comment.parentComment
    }
    const curComment = await this.commentService.getCommentById(comment.id,["parentComment"]);
    return curComment.parentComment
  }

  @ResolveField()
  public async childComment(@Parent() comment:Comment){
    const res =  await this.commentService.getCommentChildren(comment.id)
    this.chidrenCommentLength.set(comment.id,res.length)
    return res;
  }

  @ResolveField()
  public async hasChildren(@Parent() comment:Comment){
    //是否有子评论
    if(this.chidrenCommentLength.has(comment.id)){
      return this.chidrenCommentLength.get(comment.id) == 0
    }
    const res =  await this.commentService.getCommentChildren(comment.id)
    this.chidrenCommentLength.set(comment.id,res.length)
    return res.length == 0;
  }
}
