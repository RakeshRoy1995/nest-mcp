import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './categories.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly repo: Repository<Category>, // ✅ inject repository
  ) {}

  findAll() {
    return this.repo.find();
  }

  create(data: Partial<Category>) {
    const category = this.repo.create(data);
    return this.repo.save(category);
  }
}