import { ObjectType } from "@nestjs/graphql";
import { Paginated } from "src/shared/model/Paginated.model";
import { PhotoWall } from "../entity/photo-wall.entity";

@ObjectType()
export class PaginatedPhotoWall extends Paginated(PhotoWall){

}