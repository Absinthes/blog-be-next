import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileUploadService } from 'src/shared/file-upload/file-upload.service';
import { getForeign } from 'src/shared/utils';
import { Repository } from 'typeorm';
import { UpdateFriendsChainType } from '../friends-chain-type/dto/friendChain.type.update.input';
import { CreateFriendsChainInput } from './dto/friendsChain.create.input';
import { FriendsChainType } from '../friends-chain-type/entity/friends-chain-type.entity';
import { FriendsChain } from './entity/friends-chain.entity';
import { FriendsChainTypeService } from 'src/friends-chain-type/friends-chain-type.service';

@Injectable()
export class FriendsChainService {
  constructor(
    @InjectRepository(FriendsChain)
    private readonly friendsChainReposiotry: Repository<FriendsChain>,
    private readonly fileUploadService: FileUploadService,
    private readonly typeService:FriendsChainTypeService
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
    const data = await getForeign(input, ['type'], [this.typeService.oneType.bind(this)]);
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

  public async getFriendChainByTypeId(id:string){
    return this.friendsChainReposiotry.find({
      where:{
        type:{
          id
        }
      }
    })
  }
  
}
