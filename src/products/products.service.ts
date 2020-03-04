import { Injectable, NotFoundException, Patch } from '@nestjs/common';
import { Product } from './product.model';

@Injectable()
export class ProductsService {
  products: Product[] = [];
  insertProduct(title: string, description: string, price: number): string {
    const newProduct = new Product(
      new Date().getMilliseconds().toString(),
      title,
      description,
      price,
    );
    this.products.push(newProduct);
    return newProduct.id;
  }

  getProducts() {
    return [...this.products];
  }

  getProduct(prodId: string) {
    const product = this.findProduct(prodId)[0];
    return { ...product };
  }

  updateProduct(
    prodId: string,
    title: string,
    description: string,
    price: number,
  ) {
    const [product, productIndex] = this.findProduct(prodId);
    const updateProduct = { ...product };
    if (title) {
      updateProduct.title = title;
    }
    if (description) {
      updateProduct.description = description;
    }
    if (price) {
      updateProduct.price = price;
    }
    this.products[productIndex] = updateProduct;
  }

  deleteProduct(prodId: string) {
    const index = this.findProduct(prodId)[1];
    this.products.splice(index, 1);
  }

  private findProduct(id: string): [Product, number] {
    const productIndex = this.products.findIndex(item => item.id === id);
    const product = this.products[productIndex];
    if (!product) {
      throw new NotFoundException('product not found');
    }
    return [product, productIndex];
  }
}
