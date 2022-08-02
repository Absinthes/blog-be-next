import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { CommentService } from './comment.service';
import { CommnetAndCount } from './model/commnetAndCount.model';
import { Comment } from './entity/comment.entity';
import { createCommentInput } from './dtos/createComment.input';
import { StatusModel } from 'src/shared/model/status.modle';
import { updateCommentInput } from './dtos/updateComment.input';

@Resolver()
export class CommentResolver {
  constructor(private readonly commentService: CommentService) {}

  @Query(() => CommnetAndCount)
  public async getCommentByArticleId(@Args('ariticleId') ariticleId: string) {
    const res = await this.commentService.getCommentByArticleId(ariticleId);
    return new CommnetAndCount(...res);
  }

  @Query(() => Comment)
  public async getCommentByID(
    @Args({name:"id",type:() => String}) id
  ){
    return await this.commentService.getCommentById(id)
  }

  @Mutation(() => StatusModel)
  public async createComment(
    @Args({ name: 'comment', type: () => createCommentInput }) comment,
  ) {
    await this.commentService.createComment(comment);
    return new StatusModel(200, '创建成功');
  }

  @Mutation(() => StatusModel)
  public async updateComment(
    @Args({ name: 'comment', type: () => updateCommentInput }) comment,
  ) {
    await this.commentService.updateComment(comment);
    return new StatusModel(200, '修改成功');
  }

  @Mutation(() => StatusModel)
  public async deleteComment(
    @Args({ name: 'id', type: () => String}) id
  ) {
    await this.commentService.deleteComment(id);
    return new StatusModel(200, '删除成功');
  }
}
