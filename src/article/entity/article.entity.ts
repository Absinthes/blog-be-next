import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Comment } from 'src/comment/entity/comment.entity';
import { Tags } from 'src/tags/entity/tags.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Article {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  title: string;

  @Column({
    type: 'int',
    default: 0,
  })
  @Field()
  viewNum: number;

  @Column({
    type: 'text',
    nullable: true,
  })
  @Field()
  summary: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  @Field()
  content: string;

  @Column()
  @Field()
  contentNum: number;

  @Column({
    type: 'int',
    default: 0,
  })
  @Field()
  likes: number;

  @Column()
  @Field()
  path: string;

  @Column('float')
  @Field()
  weight: number;

  @Column('boolean')
  isPublic: boolean;

  @CreateDateColumn()
  @Field()
  createTime: Date;

  @UpdateDateColumn()
  updateTime: Date;

  @ManyToMany(() => Tags, (tags) => tags.articles, { cascade: true })
  @JoinTable()
  @Field(() => [Tags],{nullable:true})
  tags: Tags[];

  @OneToMany(() => Comment, (comment) => comment.ariticle)
  comments: Comment[];
}
