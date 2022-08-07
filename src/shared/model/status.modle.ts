import { Type } from '@nestjs/common';
import { Field, Int, ObjectType } from '@nestjs/graphql';

export interface IStatusModelType<T> {
  code: number;
  msg: string;
  nodes?: T;
}

@ObjectType()
export class StatusModel {
  @Field()
  code: number;

  @Field()
  msg: string;

  constructor(code: number, msg: string) {
    this.code = code;
    this.msg = msg;
  }
}

export function StatusModelGen<T>(
  classRef: Type<T>,
): Type<IStatusModelType<T>> {
  @ObjectType({ isAbstract: true })
  abstract class StatusModelType implements IStatusModelType<T> {
    @Field(() => Int)
    code: number;

    @Field()
    msg: string;

    @Field(() => classRef, {
      nullable: true,
    })
    nodes?: T;

    constructor(code: number, msg: string, nodes?: T) {
      this.code = code;
      this.msg = msg;
      this.nodes = nodes;
    }
  }

  return StatusModelType as Type<IStatusModelType<T>>;
}
