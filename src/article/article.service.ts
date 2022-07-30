import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQuerInput } from 'src/shared/dtos/paginationQuery.input';
import { Tags } from 'src/tags/entity/tags.entity';
import { Repository } from 'typeorm';
import { Article } from './entity/article.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {}
  
  async getArtilceById(id: string) {
    return this.articleRepository.findOne({
      where: {
        id
      }
    })
  }

  async getArticleAll(offset: number, limit: number) {
    return this.articleRepository.findAndCount({
      skip: offset,
      take: limit
    })
  }
}
