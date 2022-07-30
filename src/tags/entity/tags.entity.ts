import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Article } from 'src/article/entity/article.entity';
import { LiveShared } from 'src/live-shared/entity/live-shared.entity';
import { Multimedia } from 'src/multimedia/entity/multimedia.entity';
import { PhotoWall } from 'src/photo-wall/entity/photo-wall.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Tags {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column({
    comment: '1.Article 2.PhotoWall 3.LiveShare 4.multimedia',
  })
  @Field()
  type: number;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  nameEn: string;

  @Column({
    type: 'float',
  })
  @Field()
  weight: number;

  @CreateDateColumn()
  @Field()
  createTime: Date;

  @ManyToMany(() => Article, (article) => article.tags)
  articles: Article[];

  @ManyToMany(() => PhotoWall, (photoWall) => photoWall.tags)
  photoWalls: PhotoWall[];

  @ManyToMany(() => LiveShared, (liveShared) => liveShared.tags)
  liveShares: LiveShared[];

  @ManyToMany(() => Multimedia, (multimedia) => multimedia.tags)
  multimedias: Multimedia[];
}
