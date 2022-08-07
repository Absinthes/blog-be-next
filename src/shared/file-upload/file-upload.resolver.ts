import { Mutation, Resolver, Args } from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { StatusModel } from '../model/status.modle';
import { FileUploadService } from './file-upload.service';
import { FileSuccessModel } from './model/fileSuccess.model';

@Resolver()
export class FileUploadResolver {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Mutation(() => FileSuccessModel)
  public async singleUpload(
    @Args({
      name: 'file',
      type: () => GraphQLUpload,
    })
    file: FileUpload,
  ) {
    let filePath = await this.fileUploadService.fileUpload(file);
    return new FileSuccessModel(filePath);
  }
}
