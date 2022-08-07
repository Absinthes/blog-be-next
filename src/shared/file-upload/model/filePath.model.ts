import { Field, ObjectType } from "@nestjs/graphql";

export interface FilePathType {
  path: string,
  fullPath: string
}

@ObjectType()
export class FilePath {
  @Field()
  path: string

  @Field()
  fullPath: string
}