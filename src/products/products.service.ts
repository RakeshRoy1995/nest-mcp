import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './products.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly repo: Repository<Product>, // ✅ inject repository
  ) {}

  // Get all products with category
  findAll() {
    return this.repo.find({ relations: ['category'] });
  }

  // Create a new product
  create(data: Partial<Product>) {
    const product = this.repo.create(data);
    return this.repo.save(product);
  }
}