import { InputType } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@InputType()
export class UpdateFriendsChainType{
  @IsNotEmpty()
  id:string
  name?:string
}