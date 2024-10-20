// // src/entities/user.entity.ts
// import {
//   Entity,
//   PrimaryGeneratedColumn,
//   Column,
//   CreateDateColumn,
//   UpdateDateColumn,
//   OneToMany,
// } from 'typeorm';
// import { Post } from './post.entity';
// import { Comment } from './comment.entity';
// import { Like } from './like.entity';
// import { Follow } from './follow.entity';

// @Entity('users')
// export class User {
//   @PrimaryGeneratedColumn()
//   user_id: number;

//   @Column({ unique: true })
//   email: string;

//   @Column()
//   full_name: string;

//   @Column()
//   password: string;

//   @CreateDateColumn()
//   created_at: Date;

//   @UpdateDateColumn()
//   updated_at: Date;

//   @Column({ nullable: true, type: 'text' })
//   bio?: string;

//   @Column({ nullable: true })
//   user_image?: string;

//   @OneToMany(() => Post, (post) => post.user)
//   posts: Post[];

//   @OneToMany(() => Comment, (comment) => comment.user)
//   comments: Comment[];

//   @OneToMany(() => Like, (like) => like.user)
//   likes: Like[];

//   @OneToMany(() => Follow, (follow) => follow.follower)
//   followers: Follow[];

//   @OneToMany(() => Follow, (follow) => follow.followed)
//   following: Follow[];
// }
