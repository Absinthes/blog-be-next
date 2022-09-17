import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Tags } from 'src/tags/entity/tags.entity';
import { Type } from 'src/type/entity/type.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
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

  @Column({ nullable: true })
  @Field({ nullable: true })
  author: string;

  @Column({ nullable: true, comment: '文件路径'})
  @Field({ nullable: true })
  path: string;

  @Column({ nullable: true, comment: '封面图' })
  @Field({ nullable: true })
  cover: string;

  @Column({ nullable: true, comment: '格式' })
  @Field({ nullable: true })
  format: string;

  @Column({ nullable: true, comment: '外链' })
  @Field({ nullable: true })
  outerLink: string;

  @Column({
    type: 'float',
    default: 0,
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
  
  @ManyToOne(() => Type, (type) => type.multimedia, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @Field(() => Type, { nullable: true })
  type: Type;
}
