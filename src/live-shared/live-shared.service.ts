import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQuerInput } from 'src/shared/dtos/paginationQuery.input';
import { FileUploadService } from 'src/shared/file-upload/file-upload.service';
import { FilePathType } from 'src/shared/file-upload/model/filePath.model';
import { TagsService } from 'src/tags/tags.service';
import { Repository } from 'typeorm';
import { CreateLiveSharedInput } from './dtos/createLiveShared.input';
import { UpdateLiveSharedInput } from './dtos/updateLiveShared.input';
import { LiveShared } from './entity/live-shared.entity';

@Injectable()
export class LiveSharedService {
  constructor(
    @InjectRepository(LiveShared)
    private readonly liveSharedRepository: Repository<LiveShared>,
    private readonly fileUploadService: FileUploadService,
    private readonly tagsService: TagsService,
  ) {}

  public async one(id: string) {
    return this.liveSharedRepository.findOne({
      where: {
        id,
      },
    });
  }

  public async list({ offset, limit }: PaginationQuerInput) {
    return this.liveSharedRepository.findAndCount({
      skip: offset,
      take: limit,
    });
  }

  public async create(input: CreateLiveSharedInput) {
    let filePath: FilePathType, tags;
    input.file &&
      (filePath = await this.fileUploadService.fileUpload(input.file));
    input.tags.length > 0 &&
      (tags = await this.tagsService.findOrInsertTags(3, input.tags));
    const liveShared = this.liveSharedRepository.create({
      ...input,
      illustration: filePath?.path,
      tags,
    });
    return this.liveSharedRepository.save(liveShared);
  }

  public async update(input: UpdateLiveSharedInput) {
    let filePath: FilePathType;
    let liveShared = await this.one(input.id);
    input.file &&
      (filePath = await this.fileUploadService.fileUpload(await input.file));
    let tags = await this.tagsService.findOrInsertTags(3, input.tags)
    liveShared = {
      ...liveShared,
      ...input,
      illustration: filePath?.path,
      tags,
    };
    return this.liveSharedRepository.save(liveShared);
  }

  public async delete(id: string) {
    const liveShared = await this.one(id);
    return this.liveSharedRepository.remove(liveShared);
  }
}
