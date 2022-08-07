import { Type } from "@nestjs/common";
import { Field, Int, ObjectType } from "@nestjs/graphql";

export interface IPaginatedType<T>{
  nodes:T[],
  totalCount:number
}

export function Paginated<T>(classRef:Type<T>):Type<IPaginatedType<T>>{

  @ObjectType({isAbstract:true})
  abstract class PaginatedType implements IPaginatedType<T>{
    @Field((type) => [classRef],{nullable:true})
    nodes:T[]

    @Field(() => Int)
    totalCount: number;

    constructor(nodes:T[],totoalCount:number){
      this.nodes = nodes;
      this.totalCount = totoalCount
    }
  }

  return PaginatedType as Type<IPaginatedType<T>>;
}