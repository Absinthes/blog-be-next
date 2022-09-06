import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Tags } from './tags.entity';

@Entity()
@ObjectType()
export class TagType {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  @OneToMany(() => Tags, (tags) => tags.type, {
    cascade: true,
    nullable: true,
  })
  @Field(() => [Tags])
  Tags: Tags[];
}
