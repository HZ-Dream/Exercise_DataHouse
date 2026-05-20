import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
} from '@nestjs/common';

import { ResponseData } from '../../global/globalClass';
import { HttpMessage, HttpStatus } from '../../global/globalEnum';
import { Product } from '../../models/product.model';
import { ProductDto } from '../../dto/product.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

// Command
import { CreateProductCommand } from './commands/create-product/create-product.command';
import { UpdateProductCommand } from './commands/update-product/update-product.command';
import { DeleteProductCommand } from './commands/delete-product/delete-product.command';

// Query
import { GetAllProductsQuery } from './queries/get-all-products/get-all-products.query';
import { GetDetailProductQuery } from './queries/get-detail-product/get-detail-product.query';

@Controller('products')
export class ProductController {
    // Inject CommandBus & QueryBus
    constructor(
        private readonly queryBus: QueryBus,
        private readonly commandBus: CommandBus,
    ) {}

    // Query
    @Get()
    async getAllProducts() {
        return await this.queryBus.execute(new GetAllProductsQuery);
    }

    @Get(':id')
    async getDetailProduct(@Param('id') id: number) {
        return await this.queryBus.execute(new GetDetailProductQuery(id));
    }

    // Command
    @Post()
    async createProduct(
        @Body() productDto: ProductDto,
    ): Promise<ResponseData<Product>> {
        const result = await this.commandBus.execute<CreateProductCommand, Product>(
            new CreateProductCommand(productDto)
        );

        return new ResponseData(result, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
    }

    @Put(':id')
    async updateProduct(
        @Param('id') id: number,
        @Body() productDto: ProductDto,
    ): Promise<ResponseData<Product>> {
        try {            
            const result = await this.commandBus.execute<UpdateProductCommand, Product>(
                new UpdateProductCommand(id, productDto)
            );
    
            return new ResponseData(result, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            console.log(error);
            return new ResponseData<Product>(
                [],
                HttpStatus.ERROR,
                HttpMessage.ERROR,
            );
        }
    }

    @Delete(':id')
    async deleteProduct(
        @Param('id') id: number
    ): Promise<ResponseData<boolean>> {
        try {            
            await this.commandBus.execute<DeleteProductCommand, Product>(
                new DeleteProductCommand(id)
            );
    
            return new ResponseData(true, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            console.log(error);
            return new ResponseData(
                false,
                HttpStatus.ERROR,
                HttpMessage.ERROR,
            );
        }
    }
}