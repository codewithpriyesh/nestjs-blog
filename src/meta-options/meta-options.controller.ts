import { Controller, Post, Body } from '@nestjs/common';
import { MetaOptionsService } from './provider/meta-options.service';
import { CreateMetaOptionDto } from './dtos/create-meta-option.dto';

@Controller('meta-options')
export class MetaOptionsController {
  constructor(private readonly metaOptionsService: MetaOptionsService) {}

  @Post()
  public createMetaOption(@Body() createMetaOptionDto: CreateMetaOptionDto) {
    return this.metaOptionsService.createMetaOption(createMetaOptionDto);
  }
}
