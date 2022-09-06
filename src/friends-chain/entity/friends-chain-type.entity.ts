import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { FriendsChain } from './friends-chain.entity';

@Entity()
@ObjectType()
export class FriendsChainType {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  @OneToMany(() => FriendsChain, (friendsChain) => friendsChain.type,{
    cascade:true,
    nullable:true
  })
  @Field(() => [FriendsChain])
  friendsChains: FriendsChain[];
}
