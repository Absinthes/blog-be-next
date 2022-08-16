import { Field, Float, ID, InputType } from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload';

@InputType()
export class UpdateLiveSharedInput {
  @Field(() => ID)
  id: string;
  content?: string;
  address?: string;
  emotion?: string;
  @Field(() => GraphQLUpload)
  file?: FileUpload;
  @Field(() => Float)
  weight?: number;
  tags?: string[];
}
