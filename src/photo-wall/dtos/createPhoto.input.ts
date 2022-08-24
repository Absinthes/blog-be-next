import { Field, InputType } from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload';

@InputType()
export class CreatePhotoInput {
  name: string;
  @Field(() => GraphQLUpload)
  file: FileUpload;
  originUrl?: string;
  author?: string;
  tags?: string[];
  type?:string
}
