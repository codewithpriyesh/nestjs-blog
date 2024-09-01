import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  IsEnum,
  Matches,
  IsJSON,
  IsUrl,
  IsISO8601,
  IsArray,
  ValidateNested,
  MaxLength,
} from 'class-validator';
import { postType } from '../enums/postType.enum';
import { postStatus } from '../enums/postStatus.enum';
import { CreateMetaOptionDto } from './create-meta-option.dto';
import { Type } from 'class-transformer';

export class CreatePostsDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(524)
  title: string;

  @IsEnum(postType)
  @IsNotEmpty()
  postType: postType;

  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message:
      'A slug should be all small letters and uses only "-" and without spaces. For Example "my-url"',
  })
  @MaxLength(256)
  slug: string;

  @IsEnum(postStatus)
  @IsNotEmpty()
  status: postStatus;

  @IsString()
  @IsOptional()
  content?: string;

  @IsOptional()
  @IsJSON()
  schema?: string;

  @IsOptional()
  @IsUrl()
  @MaxLength(1024)
  featuredImageUrl?: string;

  @IsISO8601()
  publishOn: Date;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @MinLength(3, { each: true })
  tags: string[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateMetaOptionDto)
  metaOptions?: CreateMetaOptionDto[];
}
