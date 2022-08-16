import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class TagsCreateInput {
  @Field(() => Int)
  type: number

  @Field()
  name: string

  @Field({
    nullable: true
  })
  nameEn?: string

  @Field({
    nullable: true
  })
  weight?: number
}