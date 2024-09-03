import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';
import { MetaOption } from 'src/meta-options/meta-option.entity';
import { CreatePostsDto } from '../dtos/create-posts.dto';
import { UserService } from 'src/users/provider/users.service';
import { TagsService } from 'src/tags/provider/tags.service';
import { PatchPostsDto } from '../dtos/patch-posts.dto';

@Injectable()
export class PostService {
  constructor(
    private readonly userService: UserService,

    private readonly tagsService: TagsService,

    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,

    @InjectRepository(MetaOption)
    private readonly metaOptionRepository: Repository<MetaOption>,
  ) {}

  public async create(@Body() createPostsDto: CreatePostsDto) {
    // Find author from database based on authorId
    const author = await this.userService.findOneById(createPostsDto.authorId);

    //Find  tags

    const tags = await this.tagsService.findMultipleTags(createPostsDto.tags);

    /**
     * Not needed since we enable "cacscade : true" in entity it will
     * automatically create metaOptions
     */

    // const metaOptions = createPostsDto.metaOptions
    //   ? this.metaOptionRepository.create(createPostsDto.metaOptions)
    //   : null;

    // if (metaOptions) {
    //   await this.metaOptionRepository.save(metaOptions);
    // }

    const post = this.postRepository.create({
      ...createPostsDto,
      author: author,
      tags: tags,
    });

    /**
     * Not needed since we enable cacscade : true in entity it will
     * automatically create metaOptions
     */

    // if (metaOptions) {
    //   post.metaOptions = metaOptions;
    // }

    return await this.postRepository.save(post);
  }

  public async findAll() {
    return await this.postRepository.find({
      relations: {
        metaOptions: true,
      },
    });
  }

  public async update(patchPostDto: PatchPostsDto) {
    //find the Tags
    const tags = await this.tagsService.findMultipleTags(patchPostDto.tags);
    //find the post
    const post = await this.postRepository.findOneBy({ id: patchPostDto.id });
    // update the properties
    post.title = patchPostDto.title ?? post.title;
    post.content = patchPostDto.content ?? post.content;
    post.status = patchPostDto.status ?? post.status;
    post.postType = patchPostDto.postType ?? post.postType;
    post.slug = patchPostDto.slug ?? post.slug;
    post.featuredImageUrl =
      patchPostDto.featuredImageUrl ?? post.featuredImageUrl;
    post.publishOn = patchPostDto.publishOn ?? post.publishOn;
    //Assign the new tags
    post.tags = tags;
    // save the post and return the post
    return await this.postRepository.save(post);
  }

  public async delete(id: number) {
    await this.postRepository.delete(id);
    return { deleted: true, id };
  }
}
