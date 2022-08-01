import { Field, Float, InputType, ObjectType } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@InputType()
export class ArticleInsertInput {
  @Field(() => Float)
  weight: number
  title: string
  summary?: string
  content?: string
  isPublic: boolean
  tags?: string[]
  groups?: string[]
}