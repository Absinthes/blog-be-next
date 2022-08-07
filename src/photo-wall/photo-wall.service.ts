import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileUpload } from 'graphql-upload';
import { join } from 'path';
import { ConfigService } from 'src/config/config.service';
import { PaginationQuerInput } from 'src/shared/dtos/paginationQuery.input';
import { FileUploadService } from 'src/shared/file-upload/file-upload.service';
import {
  FilePath,
  FilePathType,
} from 'src/shared/file-upload/model/filePath.model';
import { deleteFile } from 'src/shared/nodejs';
import { TagsService } from 'src/tags/tags.service';
import { Repository } from 'typeorm';
import { CreatePhotoInput } from './dtos/createPhoto.input';
import { UpdatePhotoWallInput } from './dtos/updatePhotoWall.input';
import { PhotoWall } from './entity/photo-wall.entity';

@Injectable()
export class PhotoWallService {
  constructor(
    @InjectRepository(PhotoWall)
    private readonly photoWallRepository: Repository<PhotoWall>,
    private readonly fileUploadService: FileUploadService,
    private readonly configService: ConfigService,
    private readonly tagsService: TagsService,
  ) {}

  public async one(id: string) {
    return this.photoWallRepository.findOne({
      where: {
        id,
      },
    });
  }

  public async list({ offset, limit }: PaginationQuerInput) {
    return await this.photoWallRepository.findAndCount({
      skip: offset,
      take: limit,
      relations: {
        tags: true,
      },
    });
  }

  public async create(input: CreatePhotoInput) {
    let tags;
    let { path } = await this.fileUploadService.fileUpload(await input.file);
    if (input.tags && input.tags.length > 0) {
      tags = await this.tagsService.findOrInsertTags(2, input.tags);
    }
    const result = this.photoWallRepository.create({
      ...input,
      path,
      tags,
    });
    return await this.photoWallRepository.save(result);
  }

  public async delete(id: string) {
    const photoWall = await this.photoWallRepository.findOne({
      where: {
        id,
      },
    });
    const path = join(
      this.configService.getStaticResourceDir(),
      photoWall.path,
    );
    await deleteFile(path);
    return this.photoWallRepository.remove(photoWall);
  }

  public async update(input: UpdatePhotoWallInput) {
    let filePath: FilePathType;
    let photoWall = await this.one(input.id);
    if (input.file) {
      filePath = await this.fileUploadService.fileUpload(await input.file);
    }
    let tags = await this.tagsService.findOrInsertTags(2, input.tags)
    photoWall = {
      ...photoWall,
      ...input,
      path: filePath?.path,
      tags,
    };
    return await this.photoWallRepository.save(photoWall);
  }
}
