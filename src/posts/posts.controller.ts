import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PaginationDto } from './dto/pagination.dto';
import { Auth } from 'src/me/authentication/decorators/auth.decorator';
import { AuthType } from 'src/me/authentication/enums/auth-type.enum';
import { ActiveUser } from 'src/me/decorator/active-user.decorator';

@Auth(AuthType.Bearer)
// @Auth(AuthType.None)
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  findPosts(@ActiveUser() user, @Query() paginationDto: PaginationDto) {
    return this.postsService.findAllPosts(paginationDto);
  }

  @Get('popular')
  findPopularPosts() {
    return this.postsService.findPopularPosts();
  }

  @Get(':id')
  findPost(@Param('id') id: string) {
    return this.postsService.findOnePost(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createPost(@Body() createPostDto: CreatePostDto) {
    console.log('createPostDto');
    return this.postsService.createPost(createPostDto);
  }

  @Patch(':id')
  updatePost(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    this.postsService.incrementViews(id);
    return this.postsService.updatePost(id, updatePostDto);
  }

  @Delete(':id')
  deletePost(@Param('id') id: string) {
    return this.postsService.deletePost(id);
  }
}
