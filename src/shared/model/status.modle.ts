import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class StatusModel{
  @Field()
  code: number;

  @Field()
  msg: string;

  constructor(code: number, msg: string) {
    this.code = code
    this.msg = msg
  }
}
