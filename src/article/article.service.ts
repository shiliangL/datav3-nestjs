import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { CreateArticleDto } from "./dto/create-article.dto";
import { UpdateArticleDto } from "./dto/update-article.dto";

import { InjectRepository } from "@nestjs/typeorm";

import { ArticleEntity } from "./entities/article.entity";
import { UserEntity } from "../users/entities/user.entity";

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private articleRepository: Repository<ArticleEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}
  async create(userId: number, createArticleDto: CreateArticleDto) {
    const article = new ArticleEntity();
    article.title = createArticleDto.title;
    article.description = createArticleDto.description;
    article.tagList = createArticleDto.tagList || [];
    article.comments = [];

    const newArticle = await this.articleRepository.save(article);

    const author = await this.userRepository.findOne({
      where: { id: userId },
      relations: ["articles"],
    });
    author.articles.push(article);

    await this.userRepository.save(author);

    return newArticle;
  }

  findAll() {
    return `This action returns all article`;
  }

  findOne(id: number) {
    return `This action returns a #${id} article`;
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return `This action updates a #${id} article`;
  }

  remove(id: number) {
    return `This action removes a #${id} article`;
  }
}
