/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createCommentInput } from './dtos/createComment.input';
import { Comment } from './entity/comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commnetRepository: Repository<Comment>,
    
  ) {}

  public async getCommentByArticleId(id: string) {
    return this.commnetRepository.findAndCount({
      where:{
        ariticle:{
          id
        }
      },
      relations:{
        ariticle:true,
        rootComment:true,
        parentComment:true,
        ChildComment:true
      }
    })
  }

  public async createComment(comment:createCommentInput){
    
    const newComment = this.commnetRepository.create(comment)
    console.log(newComment)
    await this.commnetRepository.save(newComment)
  }
}
