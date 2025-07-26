import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateCategoryDto } from './dto/create-category.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // Product endpoints
  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productsService.createProduct(createProductDto);
  }

  @Get()
  async findAllProducts() {
    return this.productsService.findAllProducts();
  }

  @Get(':id')
  async findProductById(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.findProductById(id);
  }

  @Put(':id')
  async updateProduct(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.updateProduct(id, updateProductDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeProduct(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.removeProduct(id);
  }

  // Category endpoints
  @Post('categories')
  async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.productsService.createCategory(createCategoryDto);
  }

  @Get('categories')
  async findAllCategories() {
    return this.productsService.findAllCategories();
  }

  @Get('categories/:id')
  async findCategoryById(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.findCategoryById(id);
  }
}