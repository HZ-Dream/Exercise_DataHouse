import { IsNotEmpty, IsNumber, MinLength } from "class-validator";

export class ProductDto {
    @IsNotEmpty()
    categoryId!: string;

    @MinLength(5, { message: 'This field must be than 5 characters'})
    productName!: string;

    @IsNumber()
    price!: number;
};