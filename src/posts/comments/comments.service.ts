import { HttpException, HttpStatus, Injectable, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { Comment } from '../entities/comments.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentsRepository: Repository<Comment>,
  ) {}

  async findAll(@Param('postId') postId: string): Promise<Comment[]> {
    console.log('Fetching all comments for post ID:', postId);
    return this.commentsRepository.find({
      where: { post: { id: postId } },
      relations: ['post', 'user'],
    });
  }

  async findOne(id: string) {
    const comment = await this.commentsRepository.findOne({
      where: { id },
      relations: ['post', 'user'],
    });
    if (!comment) {
      throw new HttpException(
        `Comment with ID ${id} not found.`,
        HttpStatus.NOT_FOUND,
      );
    }
    return comment;
  }

  async createOne(createCommentDto: CreateCommentDto) {
    const newComment = this.commentsRepository.create(createCommentDto);
    console.log('create comment', newComment);
    await this.commentsRepository.save(newComment);
  }
}
