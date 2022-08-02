import { InputType } from "@nestjs/graphql";

@InputType()
export class CreatePhotoInput{
  name:string
  path:string
  originUrl:string
  author:string
  tags:string[]
}