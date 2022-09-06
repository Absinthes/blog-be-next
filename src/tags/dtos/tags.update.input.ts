import { Field, ID, InputType } from "@nestjs/graphql";

@InputType()
export class TagsUpdateInput {
  @Field(() => ID)
  id: string
  type?: string
  name?: string
  nameEn?: string
  weight?: number
}