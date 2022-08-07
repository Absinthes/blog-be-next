import { Field, InputType } from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload';

@InputType()
export class UpdatePhotoWallInput {
  id: string;
  name: string;
  @Field(() => GraphQLUpload, { nullable: true })
  file?: FileUpload;
  originUrl?: string;
  author?: string;
  tags?: string[];
}
