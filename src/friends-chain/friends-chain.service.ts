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
    private readonly friendsChainReposiotry:Repository<FriendsChain>,
    @InjectRepository(FriendsChainType)
    private readonly typeReposiotry:Repository<FriendsChainType>,
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
    const data = await getForeign(input,['type'],[this.oneType.bind(this)])
    const result = this.friendsChainReposiotry.create({
      ...data,
      imgSrc:path
    })
    return await this.friendsChainReposiotry.save(result)
  }

  public async delete(id:string){
    return await this.friendsChainReposiotry.delete(id)
  }

  public async all(){
    return await this.friendsChainReposiotry.find()
  }

  public async listType(offset:number,limit:number){
    return this.typeReposiotry.findAndCount({
      skip:offset,
      take:limit
    })
  }

  public async oneType(id:string){
    return await this.typeReposiotry.findOne({
      where:{
        id
      }
    })
  }

  public async createType(name:string){
    const res = this.typeReposiotry.create({
      name
    })
    return await this.typeReposiotry.save(res)
  }

  public async deleteType(id:string){
    return await this.typeReposiotry.delete(id)
  }

  public async updateType({id,name}:UpdateFriendsChainType){
    return await this.typeReposiotry.update(id,{
      name
    })
  }
}
