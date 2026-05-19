import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products')
export class Product {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    categoryId!: string;

    @Column()
    productName!: string;

    @Column('decimal')
    price!: number;
}