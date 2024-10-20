// import {
//   Column,
//   CreateDateColumn,
//   Entity,
//   PrimaryGeneratedColumn,
//   Unique,
//   UpdateDateColumn,
// } from 'typeorm';

// @Entity()
// export class User {
//   @PrimaryGeneratedColumn('uuid')
//   id: string;

//   @Column({ unique: true })
//   email: string;

//   @Column({ default: 'John Doe' })
//   full_name: string;

//   @Column({
//     default:
//       'Enthusiastic software developer with a passion for building scalable web applications and a keen interest in learning new technologies.',
//   })
//   bio: string;

//   @Column()
//   password: string;

//   @CreateDateColumn()
//   createdAt: Date;

//   @UpdateDateColumn()
//   updatedAt: Date;
// }

// src/entities/user.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Post } from '../../posts/entities/posts.entity';
import { Comment } from '../../posts/entities/comments.entity';
// import { Like } from './like.entity';
// import { Follow } from './follow.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid') // Use UUIDs for primary keys
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  full_name: string;

  @Column()
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ nullable: true, type: 'text' })
  bio?: string;

  @Column({ nullable: true })
  user_image?: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  // @OneToMany(() => Like, (like) => like.user)
  // likes: Like[];

  // @OneToMany(() => Follow, (follow) => follow.follower)
  // followers: Follow[];

  // @OneToMany(() => Follow, (follow) => follow.followed)
  // following: Follow[];
}
