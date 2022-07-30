import { Field, ObjectType } from "@nestjs/graphql";
import { IsNotEmpty, IsString } from "class-validator";

@ObjectType()
export class Token{
  @Field()
  @IsString()
  @IsNotEmpty()
  authorization: string
}