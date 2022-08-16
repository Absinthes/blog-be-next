import { ObjectType } from '@nestjs/graphql';
import { Paginated } from 'src/shared/model/Paginated.model';
import { Tags } from '../entity/tags.entity';

@ObjectType()
export class PaginatedTags {
  totalCount: number;
  nodes: Tags[];

  constructor(nodes: Tags[], totalCount: number) {
    this.nodes = nodes
    this.totalCount = totalCount
  }
}
