import { Injectable } from '@nestjs/common';
import { ProductsService } from '../products/products.service';
import { CategoriesService } from '../categories/categories.service';

@Injectable()
export class McpService {
  constructor(
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
  ) {}

  // 🧰 Define tools
  getTools() {
    return [
      {
        name: 'getProducts',
        description: 'Get all products',
        inputSchema: {
          type: 'object',
          properties: {},
        },
      },
      {
        name: 'createProduct',
        description: 'Create a product',
        inputSchema: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            price: { type: 'number' },
            categoryId: { type: 'number' },
          },
          required: ['name', 'price', 'categoryId'],
        },
      },
      {
        name: 'getCategories',
        description: 'Get all categories',
        inputSchema: {
          type: 'object',
          properties: {},
        },
      },
      {
        name: 'createCategory',
        description: 'Create category',
        inputSchema: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            description: { type: 'string' },
          },
          required: ['name'],
        },
      },
    ];
  }

  // ⚡ Tool executor
  async callTool(name: string, args: any) {
    switch (name) {
      case 'getProducts':
        return this.productsService.findAll();

      case 'createProduct':
        return this.productsService.create(args);

      case 'getCategories':
        return this.categoriesService.findAll();

      case 'createCategory':
        return this.categoriesService.create(args);

      default:
        throw new Error('Tool not found');
    }
  }
}