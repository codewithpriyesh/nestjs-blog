import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class GetUserParamDto {
  @IsInt()
  @IsNotEmpty()
  @IsOptional()
  @Type(() => Number)
  id?: number;
}
