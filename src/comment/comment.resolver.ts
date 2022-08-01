import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { CommentService } from './comment.service';
import { CommnetAndCount } from './model/commnetAndCount.model';
import { Comment } from './entity/comment.entity';
import { createCommentInput, PropIdInput } from './dtos/createComment.input';
import { StatusModel } from 'src/shared/model/status.modle';

@Resolver()
export class CommentResolver {
  constructor(private readonly commentService: CommentService) {}

  @Query(() => CommnetAndCount)
  public async getCommentByArticleId(@Args('ariticleId') ariticleId: string) {
    const res = await this.commentService.getCommentByArticleId(ariticleId);
    return new CommnetAndCount(...res);
  }

  @Mutation(() => StatusModel)
  public async createComment(
    @Args('comment') comment: createCommentInput,
    @Args({
      name: 'ariticle',
      type:() => PropIdInput
    })
    ariticle
  ) {
    // await this.commentService.createComment(comment);
    return new StatusModel(200, '创建成功');
  }
}
