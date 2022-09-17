import { Field, InputType } from '@nestjs/graphql';
import { GraphQLUpload, FileUpload } from 'graphql-upload';

@InputType()
export class MultimediaCreateInput {
  title: string;
  type: string;
  author?: string;
  format?: string
  @Field(() => GraphQLUpload, { nullable: true })
  file?: FileUpload;
  @Field(() => GraphQLUpload, { nullable: true })
  coverFile?: FileUpload;
  weight?: number;
  tags: string[];
}
