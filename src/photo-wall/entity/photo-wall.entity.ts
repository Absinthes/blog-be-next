import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Tags } from 'src/tags/entity/tags.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class PhotoWall {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  path: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  originUrl?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  author?: string;

  @CreateDateColumn()
  @Field()
  createTime: string;

  @ManyToMany(() => Tags, (tags) => tags.photoWalls)
  @JoinTable()
  @Field(() => [Tags])
  tags: Tags[];
}
