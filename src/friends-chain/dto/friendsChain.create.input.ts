import { Field, InputType } from "@nestjs/graphql";
import { FileUpload, GraphQLUpload } from "graphql-upload";

@InputType()
export class CreateFriendsChainInput{
  name:string
  @Field(() => GraphQLUpload)
  img:FileUpload
  link:string
}