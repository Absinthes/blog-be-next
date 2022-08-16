import { Field, ObjectType } from "@nestjs/graphql";
import { LiveShared } from "../entity/live-shared.entity";

@ObjectType()
export class PaginatedLiveShared {
  totalCount: number
  nodes: LiveShared[]

  constructor(nodes: LiveShared[], totalCount: number) {
    this.nodes = nodes
    this.totalCount = totalCount
  }
}