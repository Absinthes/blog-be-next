import { Global, Module } from '@nestjs/common';
import { FileUploadResolver } from './file-upload.resolver';
import { FileUploadService } from './file-upload.service';
@Global()
@Module({
  providers: [FileUploadService, FileUploadResolver],
  exports: [FileUploadService]
})
export class FileUploadModule {}
