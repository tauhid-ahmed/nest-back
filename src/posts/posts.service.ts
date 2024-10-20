import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Post } from './entities/posts.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationDto } from './dto/pagination.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
  ) {}

  async findAllPosts(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;
    const skip = (page - 1) * limit;

    const [posts, total] = await this.postsRepository.findAndCount({
      skip,
      take: limit,
      order: { created_at: 'DESC' },
      relations: ['user', 'comments'],
    });

    return {
      data: posts,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOnePost(id: string) {
    const post = await this.postsRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!post) {
      throw new HttpException(
        `Post with ID ${id} not found.`,
        HttpStatus.NOT_FOUND,
      );
    }
    return post;
  }

  async createPost(createPostDto: CreatePostDto) {
    const newPost = this.postsRepository.create(createPostDto);
    await this.postsRepository.save(newPost);
  }

  async updatePost(id: string, UpdatePostDto: UpdatePostDto) {
    const post = await this.postsRepository.findOneBy({ id });
    if (!post) {
      throw new HttpException(
        `Post with ID ${id} not found.`,
        HttpStatus.NOT_FOUND,
      );
    }
    return this.postsRepository.save({ ...post, ...UpdatePostDto });
  }

  async deletePost(id: string) {
    return this.postsRepository.delete({ id });
  }

  async incrementViews(postId: string): Promise<void> {
    const post = await this.postsRepository.findOne({ where: { id: postId } });
    if (!post) {
      throw new NotFoundException(`Post with id ${postId} not found`);
    }

    post.views += 1;
    await this.postsRepository.save(post);
  }

  async findPopularPosts(): Promise<Post[]> {
    return this.postsRepository.find({
      order: {
        views: 'DESC',
      },
      take: 10,
    });
  }
}
