import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Comment } from 'src/comment/entity/comment.entity';
import { Group } from 'src/group/entity/group.entity';
import { Tags } from 'src/tags/entity/tags.entity';
import { Type } from 'src/type/entity/type.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Article {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id?: string;

  @Column()
  @Field()
  title: string;

  @Column({
    type: 'int',
    default: 0,
  })
  @Field()
  viewNum: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  pic: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  @Field({ nullable: true })
  summary?: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  @Field({ nullable: true })
  content?: string;

  @Column({
    default: 0,
  })
  @Field()
  contentNum: number;

  @Column({
    type: 'int',
    default: 0,
  })
  @Field()
  likes: number;

  @Column({
    type: 'float',
    default: 0,
  })
  @Field()
  weight: number;

  @Column({
    type: 'boolean',
    default: false,
  })
  @Field()
  isPublic: boolean;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    comment: '创建时间',
  })
  @Field(() => String)
  createTime: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
    comment: '更新时间',
  })
  @Field(() => String)
  updateTime: Date;

  @ManyToMany(() => Tags, (tags) => tags.articles, { cascade: true })
  @JoinTable()
  @Field(() => [Tags])
  tags?: Tags[];

  @ManyToMany(() => Group, (group) => group.articles, { cascade: true })
  @JoinTable()
  @Field(() => [Group])
  groups?: Group[];

  @OneToMany(() => Comment, (comment) => comment.article, { cascade: true })
  @Field(() => [Comment])
  comments: Comment[];

  @ManyToOne(() => Type, (type) => type.articles, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @Field(() => Type, { nullable: true })
  type: Type;
}
