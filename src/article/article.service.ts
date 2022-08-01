import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQuerInput } from 'src/shared/dtos/paginationQuery.input';
import { Tags } from 'src/tags/entity/tags.entity';
import { TagsService } from 'src/tags/tags.service';
import { Repository } from 'typeorm';
import { ArticleInsertInput } from './dto/article.insert.input';
import { ArticleUpdateInput } from './dto/article.update.input';
import { Article } from './entity/article.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
    private readonly tagsService: TagsService,
  ) {}

  async Artilce(id: string) {
    return this.articleRepository.findOne({
      where: {
        id,
      },
    });
  }

  async list(offset: number, limit: number) {
    return this.articleRepository.findAndCount({
      skip: offset,
      take: limit,
    });
  }

  async insert(insertInput: ArticleInsertInput) {
    let tags;
    insertInput.tags && (tags = await this.tagsService.findOrInsertTags(1, insertInput.tags))
    const article = await this.articleRepository.create({
      ...insertInput,
      tags,
      contentNum: insertInput.content?.length
    });
    console.log(article)
    return await this.articleRepository.save(article)
  }

  async update(article: ArticleUpdateInput){
    const data: any = {
      ...article
    }
    const result = await this.Artilce(article.id)
    if(!result) throw new NotFoundException('文章不存在')
    data.tags = await this.tagsService.findOrInsertTags(1, article.tags)
    return this.articleRepository.save(Object.assign(result, data))
  }

  async delete(id: string) {
    const article = await this.Artilce(id)
    return this.articleRepository.remove(article)
  }
}
