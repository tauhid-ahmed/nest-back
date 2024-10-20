// // src/entities/like.entity.ts
// import {
//   Entity,
//   PrimaryGeneratedColumn,
//   Column,
//   CreateDateColumn,
//   ManyToOne,
// } from 'typeorm';
// import { Post } from './post.entity';
// import { User } from './user.entity';

// @Entity('likes')
// export class Like {
//   @PrimaryGeneratedColumn()
//   like_id: number;

//   @ManyToOne(() => Post, (post) => post.likes)
//   post: Post;

//   @ManyToOne(() => User, (user) => user.likes)
//   user: User;

//   @CreateDateColumn()
//   created_at: Date;
// }
