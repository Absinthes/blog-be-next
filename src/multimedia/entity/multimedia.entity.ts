import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Tags } from 'src/tags/entity/tags.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Multimedia {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  title: string;

  @Column()
  @Field()
  author: string;

  @Column({
    comment: '1.视频 2.音乐',
  })
  @Field()
  type: number;

  @Column()
  @Field()
  path: string;

  @Column()
  @Field()
  cover: string;

  @Column()
  @Field()
  format: string;

  @Column()
  @Field()
  isOuterLink: boolean;

  @Column({
    type: 'float',
    default: 0
  })
  @Field()
  weight: number;

  @CreateDateColumn()
  @Field()
  createTime: string;

  @UpdateDateColumn()
  @Field()
  updateTime: string;

  @ManyToMany(() => Tags, (tags) => tags.multimedias)
  @JoinTable()
  @Field(() => [Tags])
  tags: Tags[];
}
