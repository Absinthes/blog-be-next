import { Tags } from 'src/tags/entity/tags.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Multimedia {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column({
    comment: '1.视频 2.音乐',
  })
  type: number;

  @Column()
  path: string;

  @Column()
  cover: string;

  @Column()
  format: string;

  @Column()
  isOuterLink: boolean;

  @Column({
    type: 'float',
  })
  weight: number;

  @CreateDateColumn()
  createTime: Date;

  @UpdateDateColumn()
  updateTime: Date;

  @ManyToMany(() => Tags, (tags) => tags.multimedias)
  @JoinTable()
  tags: Tags[];
}
