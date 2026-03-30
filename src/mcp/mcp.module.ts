import { Module } from '@nestjs/common';
import { McpService } from './mcp.service';
import { McpController } from './mcp.controller';
import { ProductsModule } from '../products/products.module';
import { CategoriesModule } from '../categories/categories.module';

@Module({
  imports: [ProductsModule, CategoriesModule],
  controllers: [McpController],
  providers: [McpService],
  exports: [McpService], // ✅ MUST EXPORT
})
export class McpModule {}