import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateFriendsChainType } from './dto/friendChain.type.update.input';
import { FriendsChainType } from './entity/friends-chain-type.entity';

@Injectable()
export class FriendsChainTypeService {
  constructor(
    @InjectRepository(FriendsChainType)
    private readonly typeReposiotry: Repository<FriendsChainType>,
  ) {}

  public async listType(offset: number, limit: number) {
    return this.typeReposiotry.findAndCount({
      skip: offset,
      take: limit,
    });
  }

  public async oneType(id: string) {
    return this.typeReposiotry.findOne({
      where: {
        id,
      },
    });
  }

  public async createType(name: string) {
    const res = this.typeReposiotry.create({
      name,
    });
    return this.typeReposiotry.save(res);
  }

  public async deleteType(id: string) {
    return this.typeReposiotry.delete(id);
  }

  public async updateType({ id, name }: UpdateFriendsChainType) {
    return this.typeReposiotry.update(id, {
      name,
    });
  }

  public async getTypeByFriendId(id: string) {
    return this.typeReposiotry.findOne({
      where: {
        friendsChains: {
          id,
        },
      },
    });
  }

  public async getAllTypeList() {
    return this.typeReposiotry.find();
  }
}
