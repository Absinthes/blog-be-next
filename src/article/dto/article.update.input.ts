import { Field, Float, ID, InputType, ObjectType } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";
import { Tags } from "src/tags/entity/tags.entity";

@InputType()
export class ArticleUpdateInput {
  @Field(() => ID)
  id: string
  @Field(() => Float)
  weight: number
  title: string
  summary?: string
  content?: string
  isPublic: boolean
  tags?: string[]
  groups?: string[]
}