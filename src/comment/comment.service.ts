/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleService } from 'src/article/article.service';
import { getForeign } from 'src/shared/utils';
import { IsNull, Repository } from 'typeorm';
import { createCommentInput } from './dtos/createComment.input';
import { updateCommentInput } from './dtos/updateComment.input';
import { Comment } from './entity/comment.entity';

type relationType =
  | 'article'
  | 'rootComment'
  | 'parentComment'
  | 'childComment';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commnetRepository: Repository<Comment>,
    private readonly articleService: ArticleService,
  ) {}

  public async getCommentByArticleId(id: string,offset:number =  0,limit:number = 10) {
    return await this.commnetRepository
      .createQueryBuilder('comment')
      .leftJoinAndSelect("comment.article","article")
      // .leftJoinAndSelect("comment.childComment","childComment")
      // .leftJoinAndSelect("childComment.article","childArticle")
      // .leftJoinAndSelect("childComment.rootComment","childRootComment")
      // .leftJoinAndSelect("childComment.parentComment","childParentComment")
      .where('comment.rootComment IS NULL')
      .andWhere("article.id = :id",{id})
      .orderBy("comment.createTime","DESC")
      .limit(limit)
      .offset(offset)
      .getManyAndCount();
  }

  public async getCommentById(id: string, relations: relationType[] = []) {
    const re = {};
    relations.forEach((prop) => {
      re[prop] = true;
    });
    return await this.commnetRepository.findOne({
      where: {
        id,
      },
      relations: {
        ...re,
      },
    });
  }

  public async getComment(offset: number, limit: number) {
    return this.commnetRepository.findAndCount({
      skip: offset,
      take: limit,
      where: {
        rootComment: IsNull(),
      },
      relations: {
        article: true,
        parentComment: true,
        rootComment: true,
        childComment: true,
      },
    });
  }

  public async getCommentByRoot(offset: number, limit: number) {
    return await this.commnetRepository
      .createQueryBuilder('comment')
      .leftJoinAndSelect("comment.article","article")
      // .leftJoinAndSelect("comment.childComment","childComment")
      // .leftJoinAndSelect("childComment.article","childArticle")
      // .leftJoinAndSelect("childComment.rootComment","childRootComment")
      // .leftJoinAndSelect("childComment.parentComment","childParentComment")
      .where('comment.rootComment IS NULL')
      .limit(limit)
      .offset(offset)
      .getManyAndCount();
  }

  public async getCommentChildren(id:string){
    return this.commnetRepository.find({
      where:{
        rootComment:{
          id
        }
      },
      order:{
        createTime:"DESC"
      }
    })
  }

  public async createComment(comment: createCommentInput) {
    const data = await getForeign(
      comment,
      ['article', 'rootComment', 'parentComment'],
      [
        this.articleService.Artilce.bind(this.articleService),
        this.getCommentById.bind(this),
        this.getCommentById.bind(this),
      ],
    );
    const newComment = this.commnetRepository.create(data);
    return await this.commnetRepository.save(newComment);
  }

  public async updateComment(data: updateCommentInput) {
    const { id, ...rest } = await getForeign(
      data,
      ['article', 'rootComment', 'parentComment'],
      [
        this.articleService.Artilce.bind(this.articleService),
        this.getCommentById.bind(this),
        this.getCommentById.bind(this),
      ],
    );
    return await this.commnetRepository.update(id, {
      ...rest,
    });
  }

  public async deleteComment(id: string) {
    return await this.commnetRepository.delete(id);
  }
}



