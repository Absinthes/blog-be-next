import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, isNotEmpty, IsNotEmpty } from "class-validator";

@InputType()
export class createCommentInput{
  @IsNotEmpty()
  name:string

  @IsNotEmpty()
  content:string

  @IsEmail()
  email?:string

  @IsNotEmpty()
  browser:string

  @IsNotEmpty()
  envirconment:string

  article?:string
  rootComment?:string
  parentComment?:string
  childComment?:string

}