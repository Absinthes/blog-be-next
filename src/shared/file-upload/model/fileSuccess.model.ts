import { ObjectType } from '@nestjs/graphql';
import { StatusModelGen } from 'src/shared/model/status.modle';
import { FilePath, FilePathType } from './filePath.model';

@ObjectType()
export class FileSuccessModel extends StatusModelGen(FilePath) {
  constructor(filePath: FilePathType, msg?: string) {
    super(200, msg || '上传成功', filePath);
  }
}
