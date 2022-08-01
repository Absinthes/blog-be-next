import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';
import { Article } from 'src/article/entity/article.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  @Column({
    type: 'text',
  })
  @Field(() => String)
  content: string;

  @Column({
    default: '',
  })
  @IsEmail()
  @Field(() => String)
  email: string;

  @Column({
    default: 0,
    comment: '点赞数',
  })
  @Field(() => Int)
  likes: number;

  @Column({
    length: 20,
    comment: '浏览器版本',
  })
  @Field(() => String)
  browser: string;

  @Column({
    length: 20,
  })
  @Field(() => String)
  envirconment: string;

  @Column({
    comment: '是否展示',
    default: true,
  })
  @Field(() => Boolean)
  visible: boolean;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    comment: '创建时间'
  })
  createTime: Date

  @ManyToOne(() => Article, (article) => article.comments)
  article: Article

  @ManyToOne(() => Comment, (comment) => comment.ChildComment, {
    nullable: true,
  })
  @Field(() => Comment)
  rootComment: Comment;

  @ManyToOne(() => Comment, (comment) => comment.ChildComment, {
    nullable: true,
  })
  @Field(() => Comment)
  parentComment: Comment;

  @OneToMany(() => Comment, (comment) => comment.parentComment, {
    cascade: true,
    nullable: true,
  })
  @Field(() => [Comment])
  ChildComment: Comment[];
}
