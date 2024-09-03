import { IsInt, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreatePostsDto } from './create-posts.dto';

export class PatchPostsDto extends PartialType(CreatePostsDto) {
  @IsInt()
  @IsNotEmpty()
  id: number;
}
