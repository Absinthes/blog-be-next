import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQuerInput } from 'src/shared/dtos/paginationQuery.input';
import { IsNull, Repository, Like } from 'typeorm';
import { TagsCreateInput } from './dtos/tags.create.input';
import { TagsUpdateInput } from './dtos/tags.update.input';
import { Tags, TagsType } from './entity/tags.entity';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tags)
    private readonly tagsRepository: Repository<Tags>,
  ) {}

  public async allByType(type: TagsType) {
    return this.tagsRepository.find({
      where: {
        type,
      },
    });
  }

  public async all(){
    return this.tagsRepository.find();
  }

  public async list(paginationQuery: PaginationQuerInput, type?: number) {
    const { limit, offset } = paginationQuery;
    return this.tagsRepository.findAndCount({
      skip: offset,
      take: limit,
      where: {
        type,
      },
    });
  }

  public async nameVague(name: string) {
    return this.tagsRepository
      .createQueryBuilder('tag')
      .where('tag.name like :name', { name: `%${name}%` })
      .getMany();
  }

  public async create(input: TagsCreateInput) {
    let tagResult = this.tagsRepository.create(input);
    return this.tagsRepository.save(tagResult);
  }

  public async update(input: TagsUpdateInput) {
    return this.tagsRepository.update(input.id, input);
  }

  public async delete(id: string) {
    const tag = await this.TagById(id);
    return this.tagsRepository.remove(tag);
  }

  public async TagById(id: string) {
    return this.tagsRepository.findOne({
      where: {
        id,
      },
    });
  }

  public async TagByName(name: string) {
    return this.tagsRepository.findOne({
      where: {
        name,
      },
    });
  }

  public async ArticleTags(id: string) {
    return this.tagsRepository.find({
      where: {
        articles: {
          id,
        },
      },
    });
  }

  public async photoWallTags(id: string) {
    return this.tagsRepository.find({
      where: {
        photoWalls: {
          id,
        },
      },
    });
  }

  public async liveSharedTags(id: string) {
    return this.tagsRepository.find({
      where: {
        liveShares: {
          id,
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
  public async findOrInsertTags(type: TagsType, tags: string[]) {
    if (!Array.isArray(tags) || tags.length == 0) return [];
    let res: Tags[] = [];
    for (let i = 0; i < tags.length; i++) {
      res.push(
        await this.findOrInsertTag({
          name: tags[i],
          type,
        }),
      );
    }
    return res;
  }

  public async findOrInsertTag(tag: Tags) {
    const prev = await this.TagByName(tag.name);
    if (prev) return prev;
    const tagResult = this.tagsRepository.create(tag);
    return this.tagsRepository.save(tagResult);
  }
}
