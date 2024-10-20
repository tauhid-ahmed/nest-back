import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { Comment } from '../entities/comments.entity';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { Auth } from 'src/me/authentication/decorators/auth.decorator';
import { AuthType } from 'src/me/authentication/enums/auth-type.enum';

@Auth(AuthType.Bearer)
@Controller('posts/:postId/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  async findAll(@Param('postId') postId: string): Promise<Comment[]> {
    console.log('all comments');
    return this.commentsService.findAll(postId);
  }

  @Get(':id')
  async findOne(id: string): Promise<Comment> {
    console.log('get comment', id);
    return this.commentsService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createComment(@Body() createCommentDto: CreateCommentDto) {
    console.log('create comment', createCommentDto);
    return this.commentsService.createOne(createCommentDto);
  }
}
