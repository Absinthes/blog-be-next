import { ObjectType } from "@nestjs/graphql";
import { Paginated } from "src/shared/model/Paginated.model";
import { Multimedia } from "../entity/multimedia.entity";

@ObjectType()
export class MultimediaAndCount extends Paginated(Multimedia){

}