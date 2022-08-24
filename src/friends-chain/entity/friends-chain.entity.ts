import { ID,Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
  
}