import { MigrationInterface, QueryRunner } from "typeorm";

export class DatabaseMigration1646211341605 implements MigrationInterface {
  name = "DatabaseMigration1646211341605";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "order" DROP COLUMN "totalPrice"');
    await queryRunner.query(
      'ALTER TABLE "order" ADD "totalPrice" integer NOT NULL',
    );
    await queryRunner.query('ALTER TABLE "order_detail" DROP COLUMN "price"');
    await queryRunner.query(
      'ALTER TABLE "order_detail" ADD "price" integer NOT NULL',
    );
    await queryRunner.query('ALTER TABLE "service" DROP COLUMN "price"');
    await queryRunner.query(
      'ALTER TABLE "service" ADD "price" integer NOT NULL',
    );
    await queryRunner.query('ALTER TABLE "health_service" DROP COLUMN "price"');
    await queryRunner.query(
      'ALTER TABLE "health_service" ADD "price" integer NOT NULL',
    );
    await queryRunner.query('ALTER TABLE "health_record" DROP COLUMN "weight"');
    await queryRunner.query(
      'ALTER TABLE "health_record" ADD "weight" integer NOT NULL',
    );
    await queryRunner.query('ALTER TABLE "health_record" DROP COLUMN "height"');
    await queryRunner.query(
      'ALTER TABLE "health_record" ADD "height" integer NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "health_record" DROP COLUMN "totalPrice"',
    );
    await queryRunner.query(
      'ALTER TABLE "health_record" ADD "totalPrice" integer NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "health_record" DROP COLUMN "promotion"',
    );
    await queryRunner.query(
      'ALTER TABLE "health_record" ADD "promotion" integer',
    );
    await queryRunner.query('ALTER TABLE "post" DROP COLUMN "price"');
    await queryRunner.query('ALTER TABLE "post" ADD "price" integer NOT NULL');
    await queryRunner.query('ALTER TABLE "post" DROP COLUMN "deposit"');
    await queryRunner.query(
      'ALTER TABLE "post" ADD "deposit" integer NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" DROP COLUMN "totalPrice"',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" ADD "totalPrice" integer NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" DROP COLUMN "payForSeller"',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" ADD "payForSeller" integer NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" DROP COLUMN "deposit"',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" ADD "deposit" integer NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" DROP COLUMN "totalPrice"',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ADD "totalPrice" integer NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" DROP COLUMN "deposit"',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ADD "deposit" integer',
    );
    await queryRunner.query('ALTER TABLE "promotion" DROP COLUMN "promo"');
    await queryRunner.query(
      'ALTER TABLE "promotion" ADD "promo" integer NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "ticket" ALTER COLUMN "date" SET DEFAULT \'"2022-03-02T08:55:46.000Z"\'',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "ticket" ALTER COLUMN "date" SET DEFAULT \'2022-03-02\'',
    );
    await queryRunner.query('ALTER TABLE "promotion" DROP COLUMN "promo"');
    await queryRunner.query(
      'ALTER TABLE "promotion" ADD "promo" double precision NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" DROP COLUMN "deposit"',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ADD "deposit" double precision',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" DROP COLUMN "totalPrice"',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ADD "totalPrice" double precision NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" DROP COLUMN "deposit"',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" ADD "deposit" double precision NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" DROP COLUMN "payForSeller"',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" ADD "payForSeller" double precision NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" DROP COLUMN "totalPrice"',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" ADD "totalPrice" double precision NOT NULL',
    );
    await queryRunner.query('ALTER TABLE "post" DROP COLUMN "deposit"');
    await queryRunner.query(
      'ALTER TABLE "post" ADD "deposit" double precision NOT NULL',
    );
    await queryRunner.query('ALTER TABLE "post" DROP COLUMN "price"');
    await queryRunner.query(
      'ALTER TABLE "post" ADD "price" double precision NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "health_record" DROP COLUMN "promotion"',
    );
    await queryRunner.query(
      'ALTER TABLE "health_record" ADD "promotion" double precision',
    );
    await queryRunner.query(
      'ALTER TABLE "health_record" DROP COLUMN "totalPrice"',
    );
    await queryRunner.query(
      'ALTER TABLE "health_record" ADD "totalPrice" double precision NOT NULL',
    );
    await queryRunner.query('ALTER TABLE "health_record" DROP COLUMN "height"');
    await queryRunner.query(
      'ALTER TABLE "health_record" ADD "height" double precision NOT NULL',
    );
    await queryRunner.query('ALTER TABLE "health_record" DROP COLUMN "weight"');
    await queryRunner.query(
      'ALTER TABLE "health_record" ADD "weight" double precision NOT NULL',
    );
    await queryRunner.query('ALTER TABLE "health_service" DROP COLUMN "price"');
    await queryRunner.query(
      'ALTER TABLE "health_service" ADD "price" double precision NOT NULL',
    );
    await queryRunner.query('ALTER TABLE "service" DROP COLUMN "price"');
    await queryRunner.query(
      'ALTER TABLE "service" ADD "price" double precision NOT NULL',
    );
    await queryRunner.query('ALTER TABLE "order_detail" DROP COLUMN "price"');
    await queryRunner.query(
      'ALTER TABLE "order_detail" ADD "price" double precision NOT NULL',
    );
    await queryRunner.query('ALTER TABLE "order" DROP COLUMN "totalPrice"');
    await queryRunner.query(
      'ALTER TABLE "order" ADD "totalPrice" double precision NOT NULL',
    );
  }
}
