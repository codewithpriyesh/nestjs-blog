import { Body, Controller, Post } from '@nestjs/common';
import { PostService } from './provider/posts.service';
import { CreatePostsDto } from './dtos/create-posts.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postService: PostService) {}

  @Post()
  public createPost(@Body() createPostsDto: CreatePostsDto) {
    console.log(createPostsDto);
  }
}
