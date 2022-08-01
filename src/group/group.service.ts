import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Group } from './entity/group.entity';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
  ) {}

  public async groupByName(name: string) {
    return this.groupRepository.findOne({
      where: {
        name,
      },
    });
  }

  public async articleGroup(articleId: string) {
    return this.groupRepository.find({
      where: {
        articles: {
          id: articleId,
        },
      },
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

  public async findOrInsertGroup(group: Group) {
    const prev = await this.groupByName(group.name);
    if (prev) return prev;
    const groupResult = this.groupRepository.create(group);
    return this.groupRepository.save(groupResult);
  }
}
