import { Type } from "@nestjs/common";
import { Field, Int, ObjectType } from "@nestjs/graphql";

export interface IPaginatedType<T>{
  nodes:T[],
  totalCount:number
  hasNextPage:boolean
}

export function Paginated<T>(classRef:Type<T>):Type<IPaginatedType<T>>{

  @ObjectType({isAbstract:true})
  abstract class PaginatedType implements IPaginatedType<T>{
    @Field((type) => [classRef],{nullable:true})
    nodes:T[]

    @Field(() => Int)
    totalCount: number;

    @Field()
    hasNextPage: boolean;

    constructor(nodes:T[],totoalCount:number,hasNextPage:boolean){
      this.nodes = nodes;
      this.totalCount = totoalCount
      this.hasNextPage = hasNextPage
    }
  }

  return PaginatedType as Type<IPaginatedType<T>>;
}