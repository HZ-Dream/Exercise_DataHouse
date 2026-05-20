import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetDetailProductQuery } from './get-detail-product.query';
import { Product } from '../../product.entity';
import { NotFoundException } from '@nestjs/common';

@QueryHandler(GetDetailProductQuery)
export class GetDetailProductHandler implements IQueryHandler<GetDetailProductQuery> {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async execute(query: GetDetailProductQuery): Promise<Product> {
      const { id } = query;
      const product = await this.productRepository.findOne({ where: { id } });

      if (!product) {
        throw new NotFoundException(`Product with ID ${id} not found`);
      }

      return product; 
    }
}