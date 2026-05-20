import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProductTable1779199840772 implements MigrationInterface {
    name = 'CreateProductTable1779199840772'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "products" ("id" SERIAL NOT NULL, "categoryId" character varying NOT NULL, "productName" character varying NOT NULL, "price" numeric NOT NULL, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "products"`);
    }

}
