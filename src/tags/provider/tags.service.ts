import { Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { Tag } from '../tag.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTagsDto } from '../dtos/create-tags.dto';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  public async create(createTagDto: CreateTagsDto) {
    const tag = this.tagRepository.create(createTagDto);
    return await this.tagRepository.save(tag);
  }

  public async findMultipleTags(tags: number[]) {
    const result = await this.tagRepository.find({ where: { id: In(tags) } });
    return result;
  }

  public async delete(id: number) {
    await this.tagRepository.delete(id);
    return { deleted: true, id: id };
  }
}
