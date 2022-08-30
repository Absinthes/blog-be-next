import { Field, Float, InputType, ObjectType } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";
import { GraphQLUpload, FileUpload } from "graphql-upload";

@InputType()
export class ArticleInsertInput {
  title: string
  isPublic?: boolean
  @Field(() => Float)
  weight?: number
  summary?: string
  content?: string
  tags?: string[]
  groups?: string[]
  @Field(() => GraphQLUpload)
  file?: FileUpload;
}