import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateBoardItemTable1779249742254 implements MigrationInterface {
    name = 'CreateBoardItemTable1779249742254'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "board_items" ("id" SERIAL NOT NULL, "type" character varying NOT NULL, "columnId" character varying NOT NULL, "order" integer NOT NULL, "variant" character varying, "status" character varying, "title" character varying, "description" text, "bullets" text, "date" character varying, "emoji" character varying, "assignees" text, "color" character varying, "content" text, CONSTRAINT "PK_5f1ff9dee87e50052b1f3a64e37" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "board_items"`);
    }

}
