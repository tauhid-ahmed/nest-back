// // src/entities/follow.entity.ts
// import {
//   Entity,
//   PrimaryGeneratedColumn,
//   ManyToOne,
//   CreateDateColumn,
// } from 'typeorm';
// import { User } from './user.entity';

// @Entity('follows')
// export class Follow {
//   @PrimaryGeneratedColumn()
//   follow_id: number;

//   @ManyToOne(() => User, (user) => user.followers)
//   follower: User;

//   @ManyToOne(() => User, (user) => user.following)
//   followed: User;

//   @CreateDateColumn()
//   created_at: Date;
// }
