import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  subtitle: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  cover_image: string;

  // @IsOptional()
  // @IsPositive()
  // user_id: string;
  @IsNotEmpty()
  @IsString()
  user_id: string;

  @IsOptional()
  views?: number;
}
