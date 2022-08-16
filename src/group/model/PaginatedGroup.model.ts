import { ObjectType } from "@nestjs/graphql"
import { Group } from "../entity/group.entity"

@ObjectType()
export class PaginatedGroup {
  totalCount: number
  nodes: Group[]
  constructor(nodes: Group[], totalCount: number) {
    this.nodes = nodes
    this.totalCount = totalCount
  }
}