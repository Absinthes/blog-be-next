/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleService } from 'src/article/article.service';
import { Repository } from 'typeorm';
import { createCommentInput } from './dtos/createComment.input';
import { updateCommentInput } from './dtos/updateComment.input';
import { Comment } from './entity/comment.entity';

type relationType = "article" | "rootComment" | "parentComment" | "childComment"

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commnetRepository: Repository<Comment>,
    private readonly articleService: ArticleService,
  ) {}

  public async getCommentByArticleId(id: string) {
    return this.commnetRepository.findAndCount({
      where: {
        article: {
          id,
        },
      }
    });
  }

  public async getCommentById(id: string,relations:relationType[] = []) {
    const re = {};
    relations.forEach((prop) => {
      re[prop] = true
    })
    return await this.commnetRepository.findOne({
      where: {
        id,
      },
      relations:{
        ...re
      }
    });
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
    await this.commnetRepository.save(newComment);
  }

  public async updateComment(data:updateCommentInput){
    const {id,...rest} = await getForeign(
      data,
      ['article', 'rootComment', 'parentComment'],
      [
        this.articleService.Artilce.bind(this.articleService),
        this.getCommentById.bind(this),
        this.getCommentById.bind(this),
      ],
    )
    const res = await this.commnetRepository.update(id,{
      ...rest
    })
  }

  public async deleteComment(id:string){
    return await this.commnetRepository.delete(id)
  }
}

async function getForeign(props: any, foreigns: any[], methods: any[]) {
  for (const prop in props) {
    if (foreigns.includes(prop)) {
      const i = foreigns.indexOf(prop);
      props[prop] = await methods[i](props[prop]);
    }
  }
  return props;
}