### 数据库表关系

#### 一对一 OneToOne

比如用户表和用户信息表，它们的关系是一一对应的。

@JoinColumn 必须在且只在关系的一侧的外键上, 设置@JoinColumn的哪一方，哪一方的表将包含一个relation id和目标实体表的外键。不能同时在二者entity中。

```Typescript
// user.entity.ts

import { InformationEntity } from "../../info/info.entity"

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @OneToOne(type =>InfoEntity, info => info.user)
  @JoinColumn()
  info: InformationEntity;
}


```

```Typescript

// info.entity.ts

import { UserEntity } from "../../user/user.entity"

@Entity('info')
export class InfoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  idcard: string;
  
  @Column()
  gender: string;

  @OneToOne(type =>UserEntity, user => user.info)
  user: UserEntity;
}

```

#### 一对多 OneToMany

比如一个分类可以有过个文章。
比如一个文章可以有多个评论。

@JoinColumn 不仅定义了关系的哪一侧包含带有外键的连接列，还允许自定义连接列名和引用的列名。上边文章entity中，就自定义了列名为category_id, 如果不自定义， 默认生成的列名为categoryId。
TypeORM在处理“一对多”的关系时， 将一的主键作为多的外键，即@ManyToOne装饰的属性；这样建表时有最少的数据表操作代价，避免数据冗余。

定义的分类实体

```Typescript
// category.entity.ts
import { PostEntity } from "../../post/post.entity"

@Entity('category')
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // 一个category -> post，一个分类下面有多个发布的文章
  @OneToMany(() => PostEntity, post => post.category)
  post: PostEntity[];
}


```

定义的文章实体

```Typescript
 // posts.entity.ts
...
import { CategoryEntity } from '../../category/category.entity';

@Entity('post')
export class PostsEntity {
 @PrimaryGeneratedColumn()
 id: number;
 
 @Column({ length: 50 })
 title: string;
 
  // 分类
 @ManyToOne(() => CategoryEntity, (category) => category.posts)
 @JoinColumn({name: "category_id"})
 category: CategoryEntity;
}

```

#### 多对多 OneToMany

一篇文章可以有多个标签
一个标签页可以对应多篇文章

@JoinTable用于描述“多对多”关系， 并描述中间表表的连接列。 中间表是通过TypeORM
自动创建的一个特殊的单独表， 其中包含引用相关实体的列。通过配置joinColumns和inverseJoinColumns来自定义中间表的列名称。

注意：新版中是joinColumns和inverseJoinColumns, 之前的版本是joinColumn没有 s

定义的分类实体

```Typescript
 // posts.entity.ts
...
import { TagEntity } from '../../tag/tag.entity';

@Entity('post')
export class PostsEntity {
 @PrimaryGeneratedColumn()
 id: number;
 
 @Column({ length: 50 })
 title: string;

// 标签
@ManyToMany(() => TagEntity, (tag) => tag.posts)
@JoinTable({
  name: 'post_tag',
  joinColumns: [{ name: 'post_id' }],
  inverseJoinColumns: [{ name: 'tag_id' }],
})
tags: TagEntity[];

```

定义的文章实体

```Typescript
// tag.entity.ts
...
import { PostsEntity } from '../../posts/posts.entity';

@Entity('tag')
export class TagEntity {
 @PrimaryGeneratedColumn()
 id: number;
 
 @Column({ length: 50 })
 name: string;

@ManyToMany(() => PostsEntity, (post) => post.tags)
posts: Array<PostsEntity>;

```
