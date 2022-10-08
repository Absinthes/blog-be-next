import { Field, Float, ID, InputType, ObjectType } from "@nestjs/graphql";
import { GraphQLUpload, FileUpload } from "graphql-upload";

@InputType()
export class ArticleUpdateInput {
  @Field(() => ID)
  id: string
  @Field(() => Float)
  weight?: number
  title?: string
  summary?: string
  content?: string
  isPublic?: boolean
  tags?: string[]
  groups?: string[]
  @Field(() => GraphQLUpload)
  file?: FileUpload;
  type?: string
}