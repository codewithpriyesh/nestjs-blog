import { Repository } from 'typeorm';
import { MetaOption } from '../meta-option.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { CreateMetaOptionDto } from '../dtos/create-meta-option.dto';

@Injectable()
export class MetaOptionsService {
  constructor(
    @InjectRepository(MetaOption)
    private readonly metaOptionRepository: Repository<MetaOption>,
  ) {}

  public async createMetaOption(createMetaOptionDto: CreateMetaOptionDto) {
    const metaOption =
      await this.metaOptionRepository.create(createMetaOptionDto);
    return await this.metaOptionRepository.save(metaOption);
  }
}
