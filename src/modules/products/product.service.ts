import { Injectable } from '@nestjs/common';
import { Product } from '../../models/product.model';
import { ProductDto } from '../../dto/product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {

    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
    ) {}

    async getProducts(): Promise<Product[]> {
        return await this.productRepository.find();
    }

    async createProduct(
        productDto: ProductDto,
    ): Promise<Product> {

        const product =
            this.productRepository.create(productDto);

        return await this.productRepository.save(product);
    }

    async detailProduct(
        id: number,
    ): Promise<Product | null> {

        return await this.productRepository.findOne({
            where: { id },
        });
    }

    async updateProduct(
        id: number,
        productDto: ProductDto,
    ): Promise<Product | null> {

        await this.productRepository.update(id, productDto);

        return await this.detailProduct(id);
    }

    async deleteProduct(id: number): Promise<void> {
        await this.productRepository.delete(id);
    }
}