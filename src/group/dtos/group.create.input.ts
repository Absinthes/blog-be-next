import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class GroupCreateInput {
  @Field()
  name: string

  @Field({
    nullable: true
  })
  nameEn?: string
}