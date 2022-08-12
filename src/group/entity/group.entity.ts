import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Article } from "src/article/entity/article.entity";
import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class Group {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id?: number

  @Column({
    comment: '组别名称'
  })
  @Field()
  name: string

  @Column({
    nullable: true,
    comment: '英文组别名称'
  })
  @Field({
    nullable: true
  })
  nameEn?: string

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    comment: '创建时间',
  })
  @Field(() => String)
  createTime: Date;

  @ManyToMany(() => Article, (article) => article.groups)
  @Field(() => [Article])
  articles?: Article[]
}