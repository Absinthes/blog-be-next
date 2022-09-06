import { ID,Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { FriendsChainType } from "./friends-chain-type.entity";

@Entity()
@ObjectType()
export class FriendsChain{
  @PrimaryGeneratedColumn("uuid")
  @Field(() => ID)
  id:string

  @Column()
  @Field(() => String)
  name:string

  @Column()
  @Field(() => String)
  link:string

  @Column()
  @Field(() => String)
  imgSrc:string
  
  @Column()
  @Field(() => String)
  Introduction:string

  @ManyToOne(() => FriendsChainType,(friendsChainType) => friendsChainType.friendsChains,{
    nullable:true,
    onDelete:"CASCADE"
  })
  @Field(() => FriendsChainType)
  type:FriendsChainType
}