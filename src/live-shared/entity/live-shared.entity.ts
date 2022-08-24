import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Tags } from 'src/tags/entity/tags.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity()
@ObjectType()
export class LiveShared {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column({
    type: 'text',
  })
  @Field()
  content: string;

  @Column({ nullable: true,comment:"地址" })
  @Field({ nullable: true })
  address: string;

  @Column({ nullable: true,comment:"心情" })
  @Field({ nullable: true })
  emotion: string;

  @Column({ nullable: true,comment:"封面图片地址" })
  @Field({ nullable: true })
  illustration: string;

  @Column({
    type: 'float',
    default: 0,
    comment:"权重"
  })
  @Field({ nullable: true })
  weight: number;

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

  @ManyToMany(() => Tags, (tags) => tags.liveShares, { cascade: true })
  @JoinTable()
  @Field(() => [Tags])
  tags: Tags[];
}
