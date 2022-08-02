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
  viewNum?: number;

  @Column({
    type: 'text',
    nullable: true,
  })
  @Field({nullable: true})
  summary?: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  @Field({nullable: true})
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
  isPublic: boolean;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    comment: '创建时间',
  })
  @Field()
  createTime: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
    comment: '更新时间',
  })
  updateTime: Date;

  @ManyToMany(() => Tags, (tags) => tags.articles, { cascade: true })
  @JoinTable()
  @Field(() => [Tags],{nullable:true})
  tags: Tags[];

  @OneToMany(() => Comment, (comment) => comment.article, { cascade: true })
  comments: Comment[];
}
