import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString } from "class-validator";

@InputType()
export class CreateInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  nickName: string

  @Field()
  @IsString()
  @IsNotEmpty()
  phone: string

  @Field()
  @IsString()
  @IsNotEmpty()
  password: string
}