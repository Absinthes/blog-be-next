import { InputType } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@InputType()
export class updateTypeInput {
  @IsNotEmpty()
  id:string
  name?:string
  nameEn?: string
  describe?: string
  rootType?:string
  parentType?:string
}