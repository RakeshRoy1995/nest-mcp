import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { Product } from './products/products.entity';
import { Category } from './categories/categories.entity';
import { McpModule } from './mcp/mcp.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '3306'),
      username: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_DATABASE || 'mcp_db',
      entities: [Product, Category],
      synchronize: false, 
      logging: true,
    }),
    McpModule,
    ProductsModule, CategoriesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}









// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { ConfigModule } from '@nestjs/config';

// // Entities
// import { Product } from './products/products.entity';
// import { Category } from './categories/categories.entity';

// // Modules
// import { ProductsModule } from './products/products.module';
// import { CategoriesModule } from './categories/categories.module';

// // MCP (optional but recommended)
// import { McpModule } from './mcp/mcp.module';

// @Module({
//   imports: [
//     // Load environment variables
//     ConfigModule.forRoot({
//       isGlobal: true,
//     }),

//     // Database connection (MySQL)
//     TypeOrmModule.forRoot({
//       type: 'mysql',
//       host: process.env.DB_HOST || 'localhost',
//       port: parseInt(process.env.DB_PORT || '3306'),
//       username: process.env.DB_USERNAME || 'root',
//       password: process.env.DB_PASSWORD || '',
//       database: process.env.DB_DATABASE || 'mcp_db',

//       // Entities
//       entities: [Product, Category],

//       // ❗ IMPORTANT
//       synchronize: false, // use migrations instead
//       logging: true,
//     }),

//     // Feature modules
//     ProductsModule,
//     CategoriesModule,

//     // MCP module (tool layer)
//     McpModule,
//   ],
// })
// export class AppModule {}
