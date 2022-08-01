import { Field, ID, InputType } from "@nestjs/graphql";

@InputType()
export class TagsUpdateInput {
  @Field(() => ID)
  id: string

  @Field()
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