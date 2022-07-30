import { Tags } from 'src/tags/entity/tags.entity';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class LiveShared {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'text',
  })
  content: string;

  @Column()
  address: string;

  @Column()
  emotion: string;

  @Column()
  illustration: string;

  @Column({
    type: 'float',
  })
  weight: number;

  @ManyToMany(() => Tags, (tags) => tags.liveShares)
  @JoinTable()
  tags: Tags[]
}
