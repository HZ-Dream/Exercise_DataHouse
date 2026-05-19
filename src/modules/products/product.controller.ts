import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, ValidationPipe } from "@nestjs/common";
import { ProductService } from "./product.service";
import { ResponseData } from "../../global/globalClass";
import { HttpMessage, HttpStatus } from "../../global/globalEnum";
import { Product } from "../../models/product.model";
import { ProductDto } from "../../dto/product.dto";

@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get()
    getProducts(): ResponseData<Product[]> {
        try {
            return new ResponseData<Product[]>(this.productService.getProducts(), HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<Product[]>([], HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }

    @Post()
    createProduct(@Body() productDto: ProductDto): ResponseData<ProductDto> {
        try {
            return new ResponseData<Product>(this.productService.createProduct(productDto), HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<Product>([], HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }

    @Get('/:id')
    detailProduct(@Param('id', ParseIntPipe) id: number): ResponseData<Product | null> {
        try {                
            const product = this.productService.detailProduct(Number(id));

            return new ResponseData(
                product,
                HttpStatus.SUCCESS,
                HttpMessage.SUCCESS
            );
        } catch (error) {
            return new ResponseData([], HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }

    @Put('/:id')
    updateProduct(@Param('id') id: number, @Body() productDto: ProductDto): ResponseData<ProductDto> {
        try {
            return new ResponseData<Product>(this.productService.updateProduct(id, productDto), HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<Product>([], HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }

    @Delete('/:id')
    deleteProduct(@Param('id') id: number): ResponseData<boolean> {
        try {
            return new ResponseData<boolean>(this.productService.deleteProduct(id), HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<boolean>([], HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }
}