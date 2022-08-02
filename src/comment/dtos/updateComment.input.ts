import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty } from "class-validator";

@InputType()
export class updateCommentInput{
  @IsNotEmpty()
  id:string
  name?:string
  content?:string
  @IsEmail()
  email?:string
  browser?:string
  visible?:boolean
  envirconment?:string
  article?:string
  rootComment?:string
  parentComment?:string
}