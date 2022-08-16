import { Field, ID, ObjectType } from '@nestjs/graphql';
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
export class Type {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field(() => String)
  name: string;
  
  @Field(() => String)
  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    comment: '创建时间',
  })
  createTime: Date;

  @ManyToOne(() => Type, (type) => type.childType, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @Field(() => Type,{nullable:true})
  rootType: Type;

  @Field(() => Type,{nullable:true})
  @ManyToOne(() => Type, (type) => type.childType, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  parentType: Type;

  @OneToMany(() => Type, (type) => type.parentType, {
    cascade: true,
    nullable: true,
  })
  @Field(() => [Type],{nullable:true})
  childType: Type[];

  @Field(() => Boolean)
  hasChildren: boolean;
}
