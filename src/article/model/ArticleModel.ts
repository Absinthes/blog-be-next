import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Comment } from "src/comment/entity/comment.entity";
import { Group } from "src/group/entity/group.entity";
import { Tags } from "src/tags/entity/tags.entity";

@ObjectType()
export class ArticleModel {
  @Field(() => ID)
  id: string
  title: string
  viewNum: number
  summary?: string
  content?: string
  contentNum: number
  likes: number
  weight: number
  isPublic: boolean
  createTime: string
  updateTime: string
  @Field(() => [Tags])
  tags: Tags[]
  @Field(() => [Group])
  group: Group[]
  @Field(() => [Comment])
  comments: Comment[]
}