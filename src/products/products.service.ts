import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Product } from './product.model';

@Injectable()
export class ProductsService {
  products: Product[] = [];

  constructor(
    @InjectModel('Products') private readonly productModel: Model<Product>,
  ) {}

  async insertProduct(
    title: string,
    description: string,
    price: number,
  ): Promise<string> {
    const newProduct = new this.productModel({ title, description, price });
    const result = await newProduct.save();
    return result.id;
  }

  async getProducts() {
    const products = await this.productModel.find();
    return products;
  }

  async getProduct(prodId: string) {
    const product = await this.findProduct(prodId);
    return product;
  }

  async updateProduct(
    prodId: string,
    title: string,
    description: string,
    price: number,
  ) {
    const product = await this.findProduct(prodId);
    const updateProduct = product;
    if (title) {
      updateProduct.title = title;
    }
    if (description) {
      updateProduct.description = description;
    }
    if (price) {
      updateProduct.price = price;
    }
    updateProduct.save();
  }

  async deleteProduct(prodId: string) {
    await this.productModel.findByIdAndDelete(prodId);
  }

  private async findProduct(id: string): Promise<Product> {
    const product = await this.productModel.findById(id);
    if (!product) {
      throw new NotFoundException('product not found');
    }
    return product;
  }
}
