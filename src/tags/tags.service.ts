import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQuerInput } from 'src/shared/dtos/paginationQuery.input';
import { getForeign } from 'src/shared/utils';
import { IsNull, Repository, Like } from 'typeorm';
import { TagsCreateInput } from './dtos/tags.create.input';
import { TagsUpdateInput } from './dtos/tags.update.input';
import { TagType } from './entity/tag.type.entity';
import { Tags } from './entity/tags.entity';

enum types {
  Article = 1,
  PhotoWall,
  LiveShare,
  multimedia,
}
// 1.Article 2.PhotoWall 3.LiveShare 4.multimedia
@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tags)
    private readonly tagsRepository: Repository<Tags>,
    @InjectRepository(TagType)
    private readonly tagTypeRepository: Repository<TagType>,
  ) {}

  public async allByTypeId(id: string) {
    return this.tagsRepository.find({
      where: {
        type: {
          id,
        },
      },
    });
  }

  public async allByTypeName(name: string){
    return this.tagsRepository.find({
      where: {
        type: {
          name
        }
      }
    })
  }

  public async all() {
    return this.tagsRepository.find();
  }

  public async list(paginationQuery: PaginationQuerInput, typeEnum?: number) {
    const { limit, offset } = paginationQuery;
    let where = typeEnum ? {} : {
      type:{
        name:types[typeEnum]
      }
    } 
    return this.tagsRepository.findAndCount({
      skip: offset,
      take: limit,
      where
    });
  }

  public async nameVague(name: string) {
    return this.tagsRepository
      .createQueryBuilder('tag')
      .where('tag.name like :name', { name: `%${name}%` })
      .getMany();
  }

  public async create(input: TagsCreateInput) {
    const data = await getForeign(input, ['type'], [this.oneType.bind(this)]);
    let tagResult = this.tagsRepository.create(data);
    return this.tagsRepository.save(tagResult);
  }

  public async update(input: TagsUpdateInput) {
    let type = await this.getTagTypeByTagName(input.type)
    return this.tagsRepository.update(input.id, {
      ...input,
      type
    });
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
  public async findOrInsertTags(TypeEnum: number, tags: string[]) {
    if (!Array.isArray(tags) || tags.length == 0) return [];
    let res: Tags[] = [];
    let type;
    switch (TypeEnum) {
      case types.Article:
        type = await this.findOrInsertTagType("Article")
        break;
      case types.LiveShare:
        type = await this.findOrInsertTagType("LiveShare")
        break;
      case types.PhotoWall:
        type = await this.findOrInsertTagType("PhotoWall")
        break;
      case types.multimedia:
        type = await this.findOrInsertTagType("multimedia")
        break;
      default:
        break
    }
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

  public async oneType(id: string) {
    return this.tagTypeRepository.findOne({
      where: {
        id,
      },
    });
  }

  public async findOrInsertTagType(name: string) {
    let type = await this.oneTypeByName(name);
    if (type) return type;
    return this.createTagType(name);
  }

  public async oneTypeByName(name: string) {
    return this.tagTypeRepository.findOne({
      where: {
        name,
      },
    });
  }

  public async createTagType(name: string) {
    const type = this.tagTypeRepository.create({
      name,
    });
    return this.tagTypeRepository.save(type);
  }

  public async deleteTagType(id:string){
    return this.tagTypeRepository.delete(id)
  }

  public async updateTagType(id:string,name:string){
    return this.tagTypeRepository.update(id,{
      name
    })
  }

  public async getTagTypeByTagId(id:string){
     return  this.tagTypeRepository.findOne({
      where:{
        Tags:{
          id
        }
      }
    })
  }

  public async getTagTypeByTagName(name:string){
    return this.tagTypeRepository.findOne({
      where:{
        name
      }
    })
  }
}
