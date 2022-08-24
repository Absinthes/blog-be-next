import { ObjectType } from "@nestjs/graphql";
import { Paginated } from "src/shared/model/Paginated.model";
import { FriendsChain } from "../entity/friends-chain.entity";

@ObjectType()
export class PaginatedFriendsChain extends Paginated(FriendsChain){

}