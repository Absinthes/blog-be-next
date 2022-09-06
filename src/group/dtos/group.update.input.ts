import { Field, ID, InputType } from '@nestjs/graphql';
import { GraphQLUpload, FileUpload } from 'graphql-upload';

@InputType()
export class GroupUpdateInput {
  @Field(() => ID)
  id: number;
  name?: string;
  nameEn?: string;
  describe?: string;
  @Field(() => GraphQLUpload)
  file?: FileUpload;
}
