import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileUploadService } from 'src/shared/file-upload/file-upload.service';
import { Repository } from 'typeorm';
import { CreateFriendsChainInput } from './dto/friendsChain.create.input';
import { FriendsChain } from './entity/friends-chain.entity';

@Injectable()
export class FriendsChainService {
  constructor(
    @InjectRepository(FriendsChain)
    private readonly friendsChainReposiotry:Repository<FriendsChain>,
    private readonly fileUploadService:FileUploadService
  ){}

  public async list(offset:number,limit:number){
    return this.friendsChainReposiotry.findAndCount({
      skip:offset,
      take:limit
    })
  }

  public async create(input:CreateFriendsChainInput){
    let {path} = await this.fileUploadService.fileUpload(await input.img,"/friendChain")
    const result = this.friendsChainReposiotry.create({
      ...input,
      imgSrc:path
    })
    return await this.friendsChainReposiotry.save(result)
  }

  public async delete(id:string){
    return await this.friendsChainReposiotry.delete(id)
  }
}
