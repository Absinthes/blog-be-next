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
  name: string;

  @Column({
    type: 'text',
  })
  content: string;

  @Column({
    default: '',
  })
  @IsEmail()
  email: string;

  @Column({
    default: 0,
    comment: '点赞数',
  })
  likes: number;

  @Column({
    length: 20,
    comment: '浏览器版本',
  })
  browser: string;

  @Column({
    length: 20,
  })
  envirconment: string;

  @Column({
    comment: '是否展示',
    default: true,
  })
  visible: boolean;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    comment: '创建时间'
  })
  createTime: Date

  @ManyToOne(() => Article, (article) => article.comments)
  article: Article

  @ManyToOne(() => Comment, (comment) => comment.childComment, {
    nullable: true,
  })
  rootComment: Comment;

  @ManyToOne(() => Comment, (comment) => comment.childComment, {
    nullable: true,
  })
  parentComment: Comment;

  @OneToMany(() => Comment, (comment) => comment.parentComment, {
    cascade: true,
    nullable: true,
  })
  childComment: Comment[];
}
