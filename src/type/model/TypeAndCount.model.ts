import { extend, Field, Int, ObjectType } from "@nestjs/graphql";
import { Paginated } from "src/shared/model/Paginated.model";
import { Type } from "../entity/type.entity";

@ObjectType()
export class TypeAndCount extends Paginated(Type){
}