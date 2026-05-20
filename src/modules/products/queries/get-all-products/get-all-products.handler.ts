import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetAllProductsQuery } from './get-all-products.query';
import { Product } from '../../product.entity';

@QueryHandler(GetAllProductsQuery)
export class GetAllProductsHandler implements IQueryHandler<GetAllProductsQuery> {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async execute(query: GetAllProductsQuery): Promise<Product[]> {
    return await this.productRepository.find();
  }
}