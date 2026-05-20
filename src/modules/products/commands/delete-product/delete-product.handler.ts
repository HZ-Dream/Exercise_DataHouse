import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeleteProductCommand } from '../delete-product/delete-product.command';
import { Product } from '../../product.entity';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(DeleteProductCommand)
export class DeleteProductHandler implements ICommandHandler<DeleteProductCommand> {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async execute(command: DeleteProductCommand): Promise<boolean> {
    const { id } = command;

    const product = await this.productRepository.findOne({ where: { id } });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    await this.productRepository.delete(id);
    
    return true;
  }
}