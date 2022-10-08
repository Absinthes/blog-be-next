import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { createHash } from 'crypto';
import { writeFile } from 'fs/promises';
import { FileUpload } from 'graphql-upload';
import path, { join, resolve } from 'path';
import { ConfigService } from 'src/config/config.service';
import { mkDir, saveFile } from '../nodejs';
import { FilePathType } from './model/filePath.model';

@Injectable()
export class FileUploadService {
  constructor(private readonly configService: ConfigService) {}

  async fileUpload(
    file: FileUpload,
    dirName: string = '/PhotoWall',
  ): Promise<FilePathType> {
    if (!file) return;
    const rootDir = resolve(__dirname, '../../../public');
    const hash = createHash('sha256')
      .update(file.filename + Date.now())
      .digest('hex');
    const fileNameList = file.filename.split('.');
    fileNameList.splice(fileNameList.length - 1, 0, hash.substring(0, 8));
    let { relative, origin } = await saveFile(
      rootDir,
      dirName,
      fileNameList.join('.'),
      file.createReadStream(),
    );
    relative = relative.replace(/\\/g, '/');
    return {
      path: relative,
      fullPath: this.configService.getServiceURL() + relative,
    };
  }
}
