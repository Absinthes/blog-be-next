import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsPositive } from 'class-validator';

@InputType()
export class PaginationQuerInput {
  @IsOptional()
  @IsPositive()
  @Field()
  limit: number;

  @IsOptional()
  @IsPositive()
  @Field()
  offset: number;
}
