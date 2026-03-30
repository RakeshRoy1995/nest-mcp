import { Injectable } from '@nestjs/common';
import { ProductsService } from '../products/products.service';
import { CategoriesService } from '../categories/categories.service';

@Injectable()
export class McpService {
  constructor(
    private readonly productsService: ProductsService,
    private readonly categoriesService: CategoriesService,
  ) {}

  // 🧰 List all MCP tools
  getTools() {
    return [
      {
        name: 'getProducts',
        description: 'Fetch all products with their categories',
        inputSchema: {
          type: 'object',
          properties: {},
        },
      },
      {
        name: 'createProduct',
        description: 'Create a new product',
        inputSchema: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            price: { type: 'number' },
            categoryId: { type: 'number' },
            description: { type: 'string' },
          },
          required: ['name', 'price', 'categoryId'],
        },
      },
      {
        name: 'getCategories',
        description: 'Fetch all categories',
        inputSchema: {
          type: 'object',
          properties: {},
        },
      },
      {
        name: 'createCategory',
        description: 'Create a new category',
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

  // ⚡ Execute MCP tool calls
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
        throw new Error(`Tool '${name}' not found`);
    }
  }
}