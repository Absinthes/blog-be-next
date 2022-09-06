import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class TagsCreateInput {
  type: string
  name: string
  nameEn?: string
  weight?: number
}