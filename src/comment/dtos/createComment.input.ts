import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, isNotEmpty, IsNotEmpty } from "class-validator";

@InputType()
export class createCommentInput{
  @IsNotEmpty({message:"类型不能为空"})
  type:number

  @IsNotEmpty({message:"名字不能为空"})
  name:string

  @IsNotEmpty({message:"内容不能为空"})
  content:string

  @IsEmail()
  email?:string

  @IsNotEmpty({message:"浏览器版本不能为空"})
  browser:string

  @IsNotEmpty({message:"环境不能为空"})
  envirconment:string

  article?:string
  rootComment?:string
  parentComment?:string
}