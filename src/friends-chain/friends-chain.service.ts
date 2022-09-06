import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileUploadService } from 'src/shared/file-upload/file-upload.service';
import { getForeign } from 'src/shared/utils';
import { Repository } from 'typeorm';
import { UpdateFriendsChainType } from './dto/friendChain.type.update.input';
import { CreateFriendsChainInput } from './dto/friendsChain.create.input';
import { FriendsChainType } from './entity/friends-chain-type.entity';
import { FriendsChain } from './entity/friends-chain.entity';

@Injectable()
export class FriendsChainService {
  constructor(
    @InjectRepository(FriendsChain)
    private readonly friendsChainReposiotry: Repository<FriendsChain>,
    @InjectRepository(FriendsChainType)
    private readonly typeReposiotry: Repository<FriendsChainType>,
    private readonly fileUploadService: FileUploadService,
  ) {}

  public async list(offset: number, limit: number) {
    return this.friendsChainReposiotry.findAndCount({
      skip: offset,
      take: limit,
    });
  }

  public async create(input: CreateFriendsChainInput) {
    let { path } = await this.fileUploadService.fileUpload(
      await input.img,
      '/friendChain',
    );
    const data = await getForeign(input, ['type'], [this.oneType.bind(this)]);
    const result = this.friendsChainReposiotry.create({
      ...data,
      imgSrc: path,
    });
    return  this.friendsChainReposiotry.save(result);
  }

  public async delete(id: string) {
    return  this.friendsChainReposiotry.delete(id);
  }

  public async all() {
    return  this.friendsChainReposiotry.find();
  }

  public async listType(offset: number, limit: number) {
    return this.typeReposiotry.findAndCount({
      skip: offset,
      take: limit,
    });
  }

  public async oneType(id: string) {
    return  this.typeReposiotry.findOne({
      where: {
        id,
      },
    });
  }

  public async createType(name: string) {
    const res = this.typeReposiotry.create({
      name,
    });
    return  this.typeReposiotry.save(res);
  }

  public async deleteType(id: string) {
    return  this.typeReposiotry.delete(id);
  }

  public async updateType({ id, name }: UpdateFriendsChainType) {
    return  this.typeReposiotry.update(id, {
      name,
    });
  }

  public async getTypeByFriendId(id:string){
    return  this.typeReposiotry.findOne({
      where:{
        friendsChains:{
          id
        }
      }
    })
  }
}
