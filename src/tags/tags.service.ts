import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tags, TagsType } from './entity/tags.entity';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tags)
    private readonly tagsRepository: Repository<Tags>,
  ) {}
  
  async TagById(id: string) {
    return this.tagsRepository.find({
      where: {
        id
      }
    })
  }

  async TagByName(name: string){
    return this.tagsRepository.findOne({
      where: {
        name
      }
    })
  }

  async ArticleTags(articleId: string) {
    return this.tagsRepository.find({
      where: {
        articles: {
          id: articleId,
        },
      },
    });
  }

  /**
   * 
   * @param type 1.Article 2.PhotoWall 3.LiveShare 4.multimedia
   * @param tags 
   * @returns 
   */
  async findOrInsertTags(type: TagsType, tags: string[]) {
    let res: Tags[] = [];
    for (let i = 0; i < tags.length; i++) {
      res.push(
        await this.findOrInsertTag({
          name: tags[i],
          type,
        }),
      );
    }
    return res
  }

  async findOrInsertTag(tag: Tags) {
    const prev = await this.TagByName(tag.name)
    if(prev) return prev
    const tagResult = this.tagsRepository.create(tag)
    return this.tagsRepository.save(tagResult)
  }
}
