import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
} from '@nestjs/common';

import { ProductService } from './product.service';
import { ResponseData } from '../../global/globalClass';
import { HttpMessage, HttpStatus } from '../../global/globalEnum';
import { Product } from '../../models/product.model';
import { ProductDto } from '../../dto/product.dto';

@Controller('products')
export class ProductController {
    constructor(
        private readonly productService: ProductService,
    ) {}

    @Get()
    async getProducts(): Promise<ResponseData<Product[]>> {
        try {
            const products = await this.productService.getProducts();

            return new ResponseData<Product[]>(
                products,
                HttpStatus.SUCCESS,
                HttpMessage.SUCCESS,
            );
        } catch (error) {
            return new ResponseData<Product[]>(
                [],
                HttpStatus.ERROR,
                HttpMessage.ERROR,
            );
        }
    }

    @Post()
    async createProduct(
        @Body() productDto: ProductDto,
    ): Promise<ResponseData<Product>> {

        try {
            const product =
                await this.productService.createProduct(productDto);

            return new ResponseData<Product>(
                product,
                HttpStatus.SUCCESS,
                HttpMessage.SUCCESS,
            );

        } catch (error) {
            console.log(error);
            
            return new ResponseData<Product>(
                [],
                HttpStatus.ERROR,
                HttpMessage.ERROR,
            );
        }
    }

    @Get(':id')
    async detailProduct(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<ResponseData<Product | null>> {

        try {
            const product =
                await this.productService.detailProduct(id);

            return new ResponseData<Product | null>(
                product,
                HttpStatus.SUCCESS,
                HttpMessage.SUCCESS,
            );

        } catch (error) {

            return new ResponseData<Product | null>(
                null,
                HttpStatus.ERROR,
                HttpMessage.ERROR,
            );
        }
    }

    @Put(':id')
    async updateProduct(
        @Param('id', ParseIntPipe) id: number,
        @Body() productDto: ProductDto,
    ): Promise<ResponseData<Product | null>> {

        try {
            const product =
                await this.productService.updateProduct(id, productDto);

            return new ResponseData<Product | null>(
                product,
                HttpStatus.SUCCESS,
                HttpMessage.SUCCESS,
            );

        } catch (error) {

            return new ResponseData<Product | null>(
                null,
                HttpStatus.ERROR,
                HttpMessage.ERROR,
            );
        }
    }

    @Delete(':id')
    async deleteProduct(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<ResponseData<boolean>> {

        try {
            await this.productService.deleteProduct(id);

            return new ResponseData<boolean>(
                true,
                HttpStatus.SUCCESS,
                HttpMessage.SUCCESS,
            );

        } catch (error) {

            return new ResponseData<boolean>(
                false,
                HttpStatus.ERROR,
                HttpMessage.ERROR,
            );
        }
    }
}