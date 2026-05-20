import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateProductCommand } from '../update-product/update-product.command';
import { Product } from '../../product.entity';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(UpdateProductCommand)
export class UpdateProductHandler implements ICommandHandler<UpdateProductCommand> {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async execute(command: UpdateProductCommand): Promise<Product> {
    const { id, dto } = command;

    const product = await this.productRepository.findOne({ where: { id } });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    Object.assign(product, dto);

    return await this.productRepository.save(product);
  }
}