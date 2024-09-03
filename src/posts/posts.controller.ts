import {
  Body,
  Controller,
  Delete,
  Get,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PostService } from './provider/posts.service';
import { CreatePostsDto } from './dtos/create-posts.dto';
import { PatchPostsDto } from './dtos/patch-posts.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postService: PostService) {}

  @Post()
  public createPost(@Body() createPostsDto: CreatePostsDto) {
    return this.postService.create(createPostsDto);
  }

  @Get()
  public async findAll() {
    return await this.postService.findAll();
  }

  @Patch()
  public updatePost(@Body() patchPostDto: PatchPostsDto) {
    return this.postService.update(patchPostDto);
  }

  @Delete()
  public deletePost(@Query('id', ParseIntPipe) id: number) {
    return this.postService.delete(id);
  }
}
