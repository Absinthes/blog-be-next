import { Field, Float, InputType } from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { Tags } from 'src/tags/entity/tags.entity';

@InputType()
export class CreateLiveSharedInput {
  title: string;
  content?: string;
  address?: string;
  emotion?: string;
  @Field(() => GraphQLUpload)
  file?: FileUpload;
  @Field(() => Float)
  weight?: number;
  tags?: string[];
}
