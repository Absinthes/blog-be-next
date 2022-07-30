import { IsEmail } from "class-validator";
import { Article } from "src/article/entity/article.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column({
    type: 'text',
  })
  content: string

  @Column()
  @IsEmail()
  email: string

  @Column({
    default: 0
  })
  likes: number

  @Column({
    length: 20
  })
  browser: string

  @Column({
    length: 20
  })
  envirconment: string

  @Column()
  visible: boolean

  @CreateDateColumn()
  createTime: Date

  @ManyToOne(() => Article, (article) => article)
  article: Article

  @ManyToOne(() => Comment, (comment) => comment.ChildComment)
  rootComment: Comment

  @ManyToOne(() => Comment, (comment) => comment.ChildComment)
  parentComment: Comment

  @OneToMany(() => Comment, (comment) => comment.parentComment)
  ChildComment: Comment[]
}