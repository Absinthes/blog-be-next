import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class TagsCreateInput {
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