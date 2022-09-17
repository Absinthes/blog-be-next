import { Injectable, NotFoundException } from '@nestjs/common';
import { FileUploadService } from 'src/shared/file-upload/file-upload.service';
import { FilePath } from 'src/shared/file-upload/model/filePath.model';
import { TagsService } from 'src/tags/tags.service';
import { Repository } from 'typeorm';
import { MultimediaCreateInput } from './dtos/multimedia.create.input';
import { Multimedia } from './entity/multimedia.entity';
import { MultimediaUpdateInput } from './dtos/multimedia.update.input';
import { InjectRepository } from '@nestjs/typeorm';
import { omit } from 'lodash';
import { TypeService } from 'src/type/type.service';
import { Type } from 'src/type/entity/type.entity';

@Injectable()
export class MultimediaService {
  constructor(
    @InjectRepository(Multimedia)
    private readonly multimediaRepository: Repository<Multimedia>,
    private readonly tagsService: TagsService,
    private readonly fileUploadService: FileUploadService,
    private readonly typeService: TypeService
  ) {}

  public list(limit?: number, offset?: number, typeName?: string) {
    let where;
    if (typeName) {
      where = [
        {
          type: {
            name: typeName,
          },
        },
        {
          type: {
            nameEn: typeName,
          },
        },
      ];
    }
    return this.multimediaRepository.findAndCount({
      skip: offset,
      take: limit,
      where
    });
  }

  public one(id: string) {
    return this.multimediaRepository.findOne({
      where: {
        id,
      },
    });
  }

  public async create(input: MultimediaCreateInput) {
    let tags, filePath: FilePath, coverFilePath: FilePath, type: Type
    if (input.tags) {
      tags = await this.tagsService.findOrInsertTags(4, input.tags);
    }
    if (input.file) {
      input.format = (await input.file).mimetype.split('/')[1]
      filePath = await this.fileUploadService.fileUpload(
        await input.file,
        `/${input.type}`,
      );
    }
    if (input.coverFile) {
      coverFilePath = await this.fileUploadService.fileUpload(
        await input.coverFile,
        `/${input.type}/coverPicture`,
      );
    }
    type = await this.typeService.getTypeByName(input.type)
    const inserInput = omit(input, ['tags', 'file', 'coverFile']);
    //@ts-ignore
    const multimedia = this.multimediaRepository.create({
      ...inserInput,
      tags,
      path: filePath?.path,
      cover: coverFilePath?.path,
      type
    });
    return this.multimediaRepository.save(multimedia);
  }

  public async update(input: MultimediaUpdateInput) {
    const result = await this.one(input.id);
    if (!result) throw new NotFoundException('媒体不存在');
    let tags, filePath: FilePath, coverFilePath: FilePath, type: Type
    if (input.tags) {
      tags = await this.tagsService.findOrInsertTags(4, input.tags);
    }
    if (input.file) {
      input.format = (await input.file).mimetype.split('/')[1]
      filePath = await this.fileUploadService.fileUpload(
        await input.file,
        `/${input.type}`,
      );
    }
    if (input.coverFile) {
      coverFilePath = await this.fileUploadService.fileUpload(
        await input.coverFile,
        `/${input.type}/coverPicture`,
      );
    }
    if(input.type){
      type = await this.typeService.getTypeByName(input.type)
    }
    const updateInput = omit(input, ['tags', 'file', 'coverFile']);
    //@ts-ignore
    return this.multimediaRepository.update(input.id, {
      ...result,
      ...updateInput,
      tags,
      path: filePath.path,
      cover: coverFilePath.path,
      type
    });
  }

  public async deleted(id: string) {
    const multimedia = await this.one(id);
    return this.multimediaRepository.remove(multimedia);
  }
}
