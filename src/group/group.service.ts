import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQuerInput } from 'src/shared/dtos/paginationQuery.input';
import { FileUploadService } from 'src/shared/file-upload/file-upload.service';
import { FilePath } from 'src/shared/file-upload/model/filePath.model';
import { Repository } from 'typeorm';
import { GroupCreateInput } from './dtos/group.create.input';
import { GroupUpdateInput } from './dtos/group.update.input';
import { Group } from './entity/group.entity';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
    private readonly fileUploadService: FileUploadService,
  ) {}

  public async group(id: number) {
    return await this.groupRepository.findOne({
      where: {
        id,
      },
    });
  }

  public async groupByName(name: string) {
    return this.groupRepository.findOne({
      where: {
        name,
      },
    });
  }

  public async list(input: PaginationQuerInput) {
    const { limit, offset } = input;
    return this.groupRepository.findAndCount({
      skip: offset,
      take: limit,
      order: {
        createTime: "DESC"
      }
    });
  }

  public async create(group: GroupCreateInput) {
    const prev = await this.groupByName(group.name);
    if (prev) throw new BadRequestException('group已存在');
    let filePath: FilePath;
    group.file &&
      (filePath = await this.fileUploadService.fileUpload(
        await group.file,
        '/Group',
      ));
    const result = this.groupRepository.create({
      ...group,
      pic: filePath.path,
    });
    return this.groupRepository.save(result);
  }

  public async update(group: GroupUpdateInput) {
    let filePath: FilePath;
    group.file &&
      (filePath = await this.fileUploadService.fileUpload(
        await group.file,
        '/Group',
      ));
    delete group.file;
    return this.groupRepository.update(group.id, {
      ...group,
      pic: filePath?.path,
    });
  }

  public async delete(id: number) {
    const group = await this.group(id);
    return this.groupRepository.remove(group);
  }

  public async articleGroup(articleId: string) {
    return this.groupRepository.find({
      where: {
        articles: {
          id: articleId,
        },
      },
      order: {
        createTime: "ASC"
      }
    });
  }

  public async findOrInsertGroups(groups: string[]) {
    let res: Group[] = [];
    for (let it of groups) {
      res.push(
        await this.findOrInsertGroup({
          name: it,
        }),
      );
    }
    return res;
  }

  public async findOrInsertGroup(group: GroupCreateInput) {
    const prev = await this.groupByName(group.name);
    if (prev) return prev;
    let res = this.groupRepository.create(group);
    return this.groupRepository.save(res);
  }

  public async nameVague(name: string) {
    return this.groupRepository.createQueryBuilder('group')
      .where('group.name like :name', { name: `%${name}%` })
      .getMany()
  }
}
