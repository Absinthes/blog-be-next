import { extend, Field, Int, ObjectType } from "@nestjs/graphql";
import { Paginated } from "src/shared/model/Paginated.model";
import { Comment } from "../entity/comment.entity";

@ObjectType()
export class CommnetAndCount extends Paginated(Comment){
}