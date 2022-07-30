import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tags } from './entity/tags.entity';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tags)
    private readonly tagsRepository: Repository<Tags>,
  ) {}

  async ArticleTags(articleId: string){
    return this.tagsRepository.find({
      where: {
        articles: {
          id: articleId
        }
      },
    })
  }
}
