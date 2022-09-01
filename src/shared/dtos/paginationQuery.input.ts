import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsPositive } from 'class-validator';

@InputType()
export class PaginationQuerInput {
  @IsOptional()
  @IsPositive()
  @Field({ nullable: true })
  limit?: number;

  @IsOptional()
  @IsPositive()
  @Field({ nullable: true })
  offset?: number;
}
