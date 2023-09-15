import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { ArticleEntity } from "./article.entity";

@Entity()
export class CommentEntity {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  body: string;

  @ManyToOne(() => ArticleEntity, (article) => article.comments)
  article: ArticleEntity;
}
