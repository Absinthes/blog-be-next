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

export enum TypeEnum {
  article,
  commnet
}

@Entity()
@ObjectType()
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Field(() =>Int)
  @Column()
  type:number

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => String)
  @Column({
    type: 'text',
  })
  content: string;

  @Field(() => String)
  @Column({
    default: '',
  })
  @IsEmail()
  email: string;

  @Field(() => String)
  @Column({
    default: 0,
    comment: '点赞数',
  })
  likes: number;

  @Field(() => String)
  @Column({
    length: 20,
    comment: '浏览器版本',
  })
  browser: string;

  @Field(() => String)
  @Column({
    length: 20,
  })
  envirconment: string;

  @Field(() => Boolean)
  @Column({
    comment: '是否展示',
    default: true,
  })
  visible: boolean;

  @Field(() => String)
  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    comment: '创建时间',
  })
  createTime: Date;

  @Field(() => Article,{nullable:true})
  @ManyToOne(() => Article, (article) => article.comments)
  article: Article;

  @Field(() => Comment,{nullable:true})
  @ManyToOne(() => Comment, (comment) => comment.childComment, {
    nullable: true,
    onDelete:"CASCADE"
  })
  rootComment: Comment;

  @Field(() => Comment,{nullable:true})
  @ManyToOne(() => Comment, (comment) => comment.childComment, {
    nullable: true,
    onDelete:"CASCADE"
  })
  parentComment: Comment;

  @Field(() => [Comment])
  @OneToMany(() => Comment, (comment) => comment.parentComment, {
    cascade: true,
    nullable: true,
    // onDelete:"CASCADE"
  })
  childComment: Comment[];

  @Field(() => Boolean)
  hasChildren:boolean
}
