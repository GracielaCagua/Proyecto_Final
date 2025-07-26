import { IsString, IsNumber, IsPositive, IsOptional, IsUrl, IsUUID } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsString()
  sku: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  stock?: number;

  @IsUrl()
  @IsOptional()
  imageUrl?: string;

  @IsUUID()
  categoryId: string;
}