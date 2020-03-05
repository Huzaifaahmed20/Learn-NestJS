import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Post()
  async addProducts(
    @Body() newProduct: { title: string; description: string; price: number },
  ) {
    const { title, description, price } = newProduct;
    const generatedId = await this.productService.insertProduct(
      title,
      description,
      price,
    );
    return { id: generatedId };
  }

  @Get()
  async getAllProducts() {
    const products = await this.productService.getProducts();
    return products;
  }

  @Get(':id')
  getProduct(@Param('id') prodId: string) {
    return this.productService.getProduct(prodId);
  }

  @Patch(':id')
  async updateProduct(
    @Param('id') prodId: string,
    @Body()
    updateProduct: { title: string; description: string; price: number },
  ) {
    const { title, description, price } = updateProduct;
    await this.productService.updateProduct(prodId, title, description, price);
    return null;
  }

  @Delete(':id')
  async deleteProduct(@Param('id') prodId: string) {
    await this.productService.deleteProduct(prodId);
    return null;
  }
}
