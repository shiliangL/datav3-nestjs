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
