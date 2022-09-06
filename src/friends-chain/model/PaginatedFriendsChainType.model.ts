import { ObjectType } from "@nestjs/graphql";
import { Paginated } from "src/shared/model/Paginated.model";
import { FriendsChainType } from "../entity/friends-chain-type.entity";

@ObjectType()
export class PaginatedFriendTypesChain extends Paginated(FriendsChainType){

}