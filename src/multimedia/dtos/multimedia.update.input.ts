import { Field, InputType } from '@nestjs/graphql';
import { GraphQLUpload, FileUpload } from 'graphql-upload';

@InputType()
export class MultimediaUpdateInput {
  id: string
  title?: string;
  author?: string;
  format?: string
  @Field(() => GraphQLUpload, { nullable: true })
  file?: FileUpload;
  @Field(() => GraphQLUpload, { nullable: true })
  coverFile?: FileUpload;
  weight?: number;
  tags?: string[];
  type?: string;
}
