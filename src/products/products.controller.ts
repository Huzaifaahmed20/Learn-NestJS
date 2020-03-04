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
  addProducts(
    @Body() newProduct: { title: string; description: string; price: number },
  ): {} {
    const { title, description, price } = newProduct;
    const generatedId = this.productService.insertProduct(
      title,
      description,
      price,
    );
    return { id: generatedId };
  }

  @Get()
  getAllProducts() {
    return this.productService.getProducts();
  }

  @Get(':id')
  getProduct(@Param('id') prodId: string) {
    return this.productService.getProduct(prodId);
  }

  @Patch(':id')
  updateProduct(
    @Param('id') prodId: string,
    @Body()
    updateProduct: { title: string; description: string; price: number },
  ) {
    const { title, description, price } = updateProduct;
    this.productService.updateProduct(prodId, title, description, price);
    return null;
  }

  @Delete(':id')
  deleteProduct(@Param('id') prodId: string) {
    this.productService.deleteProduct(prodId);
    return null;
  }
}
