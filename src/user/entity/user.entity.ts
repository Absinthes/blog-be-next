import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column({
    comment:"名称"
  })
  @Field()
  nickName: string;

  @Column({
    comment:"手机号码"
  })
  @Field()
  phone: string;

  @Column({
    nullable: true,
  })
  @Field({ nullable: true })
  @IsEmail()
  email?: string;

  @Column({
    nullable: true,
    default: '/deafult.png',
  })
  @Field({ nullable: true })
  avatarUrl?: string;

  @Column()
  password: string;

  @Column({
    type: 'bigint',
    comment: '1.总管理员',
    default: 1,
  })
  @Field()
  role: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  @Field()
  createTime: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  @Field()
  updateTime: Date;
}
