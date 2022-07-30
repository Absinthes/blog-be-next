import { Tags } from 'src/tags/entity/tags.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class PhotoWall {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  path: string;

  @Column({
    nullable: true,
  })
  originUrl: string;

  @Column({
    nullable: true,
  })
  author: string;

  @CreateDateColumn()
  createTime: string;

  @ManyToMany(() => Tags, (tags) => tags.photoWalls)
  @JoinTable()
  tags: Tags[]
}
