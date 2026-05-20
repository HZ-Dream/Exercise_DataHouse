import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductCommand } from './create-product.command';
import { Product } from '../../product.entity';

@CommandHandler(CreateProductCommand)
export class CreateProductHandler implements ICommandHandler<CreateProductCommand> {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async execute(command: CreateProductCommand): Promise<Product> {
    // Lấy dto từ trong command ra
    const { categoryId, productName, price } = command.dto;

    const newProduct = this.productRepository.create({
      categoryId,
      productName,
      price,
    });

    return await this.productRepository.save(newProduct);
  }
}