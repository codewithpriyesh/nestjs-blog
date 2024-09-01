import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMetaOptionDto {
  @IsString()
  @IsNotEmpty()
  key: string;

  @IsNotEmpty()
  value: any;
}
