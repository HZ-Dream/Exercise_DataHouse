import { IsOptional } from 'class-validator'

export class BoardItemDto {
  @IsOptional()
  type!: string;
  @IsOptional()
  columnId!: string;
  @IsOptional()
  order!: number;
  @IsOptional()
  variant?: string;
  @IsOptional()
  status?: string;
  @IsOptional()
  title?: string;

  description?: string;

  @IsOptional()
  bullets?: string[];
  @IsOptional()
  date?: string;
  @IsOptional()
  emoji?: string;
  @IsOptional()
  assignees?: string[];
  @IsOptional() 
  color?: string;
  @IsOptional()
  content?: string;
}