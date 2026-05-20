import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductController } from './product.controller';
import { Product } from '../../modules/products/product.entity';
import { CqrsModule } from '@nestjs/cqrs';

// Command
import { CreateProductHandler } from './commands/create-product/create-product.handler';
import { UpdateProductHandler } from './commands/update-product/update-product.handler';
import { DeleteProductHandler } from './commands/delete-product/delete-product.handler';

// Query
import { GetAllProductsHandler } from './queries/get-all-products/get-all-products.handler';
import { GetDetailProductHandler } from './queries/get-detail-product/get-detail-product.handler';

export const CommandHandlers = [CreateProductHandler, UpdateProductHandler, DeleteProductHandler];
export const QueryHandlers = [GetAllProductsHandler, GetDetailProductHandler];

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    CqrsModule,
  ],
  controllers: [ProductController],
  providers: [
    ...CommandHandlers,
    ...QueryHandlers,
  ],
})
export class ProductModule {}