import { InputType } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@InputType()
export class createTypeInput{
  @IsNotEmpty({message:"名称不能为空"})
  name:string
  nameEn: string
  describe?: string
  rootType?:string
  parentType?:string
}