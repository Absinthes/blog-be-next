import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Article } from 'src/article/entity/article.entity';
import { LiveShared } from 'src/live-shared/entity/live-shared.entity';
import { Multimedia } from 'src/multimedia/entity/multimedia.entity';
import { PhotoWall } from 'src/photo-wall/entity/photo-wall.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TagType } from './tag.type.entity';

// export type TagsType = 1 | 2 | 3 | 4

@Entity()
@ObjectType()
export class Tags {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id?: string;

  @ManyToOne(() => TagType,(tagType) => tagType.Tags,{
    nullable:true,
    onDelete:"CASCADE"
  })
  @Field(() => TagType)
  type: TagType;

  @Column()
  @Field()
  name: string;

  @Column({
    nullable: true
  })
  @Field({
    nullable: true
  })
  nameEn?: string;

  @Column({
    type: 'int',
    default: 0
  })
  @Field()
  weight?: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    comment: '创建时间',
  })
  @Field(() => String)
  createTime?: Date;

  @ManyToMany(() => Article, (article) => article.tags)
  @Field(() => [Article])
  articles?: Article[];

  @ManyToMany(() => PhotoWall, (photoWall) => photoWall.tags)
  @Field(() => [PhotoWall])
  photoWalls?: PhotoWall[];

  @ManyToMany(() => LiveShared, (liveShared) => liveShared.tags)
  @Field(() => [LiveShared])
  liveShares?: LiveShared[];

  @ManyToMany(() => Multimedia, (multimedia) => multimedia.tags)
  @Field(() => [Multimedia])
  multimedias?: Multimedia[];
}
