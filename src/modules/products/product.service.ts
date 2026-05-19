import { Injectable } from "@nestjs/common";
import { Product } from "../../models/product.model";
import { ProductDto } from "../../dto/product.dto";

@Injectable()
export class ProductService {
    private products: Product[] = [
        {id: 1, categoryId: 1, productName: 'Cookie', price: 100},
        {id: 2, categoryId: 2, productName: 'Candy', price: 50},
        {id: 3, categoryId: 1, productName: 'Cake', price: 200},
    ]

    getProducts(): Product[] {
        return this.products;
    }

    createProduct(productDto: ProductDto): Product {
        const product: Product = {
            id: Math.random(),
            ...productDto
        };

        this.products.push(product);
        return product;
    }

    detailProduct(id: number): Product | null {
        const product = this.products.find(item => item.id === Number(id));
        return product || null;
    }

    updateProduct(id: number, productDto: ProductDto): Product {
        const index = this.products.findIndex(item => item.id === Number(id));
        this.products[index].categoryId = productDto.categoryId;
        this.products[index].productName = productDto.productName;
        this.products[index].price = productDto.price;

        return this.products[index];
    }

    deleteProduct(id: number): boolean {
        const index = this.products.findIndex(item => item.id === Number(id));

        if(index !== -1) {   
            this.products.splice(index, 1);
            return true;
        }
        
        return false;
    }
}