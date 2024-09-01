import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostService } from './provider/posts.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [PostsController],
  providers: [PostService],
})
export class PostsModule {}
