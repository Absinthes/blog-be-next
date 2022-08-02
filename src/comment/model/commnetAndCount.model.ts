import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Comment } from "../entity/comment.entity";

@ObjectType()
export class CommnetAndCount {

  constructor(comment:Comment[],count:number){
    this.data = comment
    this.count = count
  }

  @Field(() => [Comment])
  data:Comment[]

  @Field(() => Int)
  count:number
}