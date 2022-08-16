import { Field, ID, InputType } from "@nestjs/graphql";

@InputType()
export class GroupUpdateInput {
  @Field(() => ID)
  id: number
  @Field()
  name: string
  nameEn?: string
}