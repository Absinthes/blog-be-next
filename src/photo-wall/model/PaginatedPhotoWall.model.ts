import { Paginated } from "src/shared/model/Paginated.model";
import { PhotoWall } from "../entity/photo-wall.entity";

@Object
export class PaginatedPhotoWall extends Paginated(PhotoWall){

}