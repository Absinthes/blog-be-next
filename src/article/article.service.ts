import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupService } from 'src/group/group.service';
import { PaginationQuerInput } from 'src/shared/dtos/paginationQuery.input';
import { FileUploadService } from 'src/shared/file-upload/file-upload.service';
import { FilePathType } from 'src/shared/file-upload/model/filePath.model';
import { TagsService } from 'src/tags/tags.service';
import { IsNull, Repository } from 'typeorm';
import { ArticleInsertInput } from './dto/article.insert.input';
import { ArticleUpdateInput } from './dto/article.update.input';
import { Article } from './entity/article.entity';
import { maxWeight } from 'src/global';
import { TypeService } from 'src/type/type.service';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
    private readonly tagsService: TagsService,
    private readonly groupService: GroupService,
    private readonly fileUploadService: FileUploadService,
    private readonly typeService: TypeService
  ) {}

  public async Artilce(id: string) {
    return this.articleRepository.findOne({
      where: {
        id,
      },
    });
  }

  public async sticky() {
    return this.articleRepository.find({
      where: {
        weight: maxWeight,
      },
    });
  }

  public async unStickyList(offset: number, limit: number) {
    return this.articleRepository
      .createQueryBuilder('article')
      .where('article.weight < :maxWeight', { maxWeight: maxWeight })
      .skip(offset)
      .take(limit)
      .getManyAndCount();
  }

  public async list(offset: number, limit: number) {
    return this.articleRepository.findAndCount({
      skip: offset,
      take: limit,
      order: {
        weight: 'DESC',
        createTime: 'DESC',
      },
    });
  }


  public async insert(insertInput: ArticleInsertInput) {
    let tags, groups, type, filePath: FilePathType;
    insertInput.file &&
      (filePath = await this.fileUploadService.fileUpload(
        await insertInput.file,
      ));
    insertInput.tags &&
      (tags = await this.tagsService.findOrInsertTags(1, insertInput.tags));
    insertInput.groups &&
      (groups = await this.groupService.findOrInsertGroups(insertInput.groups));
    insertInput.type && 
      (type = await this.typeService.getTypeById(insertInput.type))
    const article = await this.articleRepository.create({
      ...insertInput,
      tags,
      contentNum: insertInput.content?.length,
      groups,
      pic: filePath?.path,
      type
    });
    return await this.articleRepository.save(article);
  }

  public async update(article: ArticleUpdateInput) {
    let filePath: FilePathType;
    const data: any = {
      ...article,
    };
    const result = await this.Artilce(article.id);
    if (!result) throw new NotFoundException('文章不存在');
    if (article.file) {
      filePath = await this.fileUploadService.fileUpload(await article.file);
      data.pic = filePath.path;
    }
    data.tags = await this.tagsService.findOrInsertTags(1, article.tags);
    data.groups &&
      (data.groups = await this.groupService.findOrInsertGroups(
        article.groups,
      ));
    article.type && 
        (data.type = await this.typeService.getTypeById(article.type))
    console.log(data.type)
    Object.assign(result, data);
    return this.articleRepository.save(result);
  }

  public async delete(id: string) {
    const article = await this.Artilce(id);
    return this.articleRepository.remove(article);
  }

  public async articleGroup(groupId: number) {
    return this.articleRepository.find({
      where: {
        groups: {
          id: groupId,
        },
      },
      order: {
        createTime: 'ASC',
      },
    });
  }

  public async articleByTagId(id: string, pagination?: PaginationQuerInput) {
    const params = {};
    if (pagination) {
      Object.assign(params, {
        skip: pagination?.offset,
        take: pagination?.limit,
      });
    }
    return this.articleRepository.findAndCount({
      ...params,
      where: {
        tags: {
          id,
        },
      },
    });
  }

  public async articleByTypeId(
    id: string,
    isRoot: boolean = false,
    pagination?: PaginationQuerInput,
  ) {
    const params = {};
    if (pagination) {
      Object.assign(params, {
        skip: pagination?.offset,
        take: pagination?.limit,
      });
    }
    if (!isRoot) {
      return this.articleRepository.findAndCount({
        ...params,
        where: {
          type: {
            id,
          },
        },
      });
    }

    return this.articleRepository.findAndCount({
      ...params,
      where: [
        {
          type: {
            id,
          },
        },
        {
          type: {
            rootType: {
              id,
            },
          },
        },
      ],
    });
  }

  public async articleByTypeName(
    name: string,
    isRoot: boolean = false,
    pagination?: PaginationQuerInput,
  ) {
    const params = {};
    if (pagination) {
      Object.assign(params, {
        skip: pagination?.offset,
        take: pagination?.limit,
      });
    }
    if (!isRoot) {
      return this.articleRepository.findAndCount({
        ...params,
        where: [
          {
            type: {
              name,
            },
          },
          {
            type: {
              nameEn: name,
            },
          },
        ],
      });
    }

    return this.articleRepository.findAndCount({
      ...params,
      where: [
        {
          type: {
            name,
          },
        },
        {
          type: {
            nameEn: name,
          },
        },
        {
          type: {
            rootType: {
              name,
            },
          },
        },
        {
          type: {
            rootType: {
              nameEn: name,
            },
          },
        },
      ],
    });
  }

  public async articleByYear(year: number) {
    const start = new Date(`${year}-01-01`);
    const end = new Date(`${year}-12-31`);
    return this.articleRepository
      .createQueryBuilder('article')
      .where('article.createTime  BETWEEN :start AND :end', {
        start,
        end,
      })
      .getMany();
  }

  public async articleByMonth(year:number,month:number){
    const start = new Date(year,month - 1,1)
    const nextMonthFirstDay = new Date(year,month,1)
    const  oneDay = 1000*60 * 60 * 24
    let end = new Date(nextMonthFirstDay.getTime() - oneDay);
    return this.articleRepository.createQueryBuilder('article')
    .where('article.createTime  BETWEEN :start AND :end', {
      start,
      end,
    })
    .getMany();
  }

  public async articleByNewOrLastCreatTime(type: 'ASC' | 'DESC') {
    return this.articleRepository
      .createQueryBuilder('article')
      .orderBy('article.createTime', type)
      .limit(1)
      .getOne();
  }
}
