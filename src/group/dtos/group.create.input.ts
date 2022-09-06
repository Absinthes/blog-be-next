import { Field, InputType } from "@nestjs/graphql";
import { GraphQLUpload, FileUpload } from "graphql-upload";

@InputType()
export class GroupCreateInput {
  name: string
  nameEn?: string
  describe?: string
  @Field(() => GraphQLUpload)
  file?: FileUpload;
}