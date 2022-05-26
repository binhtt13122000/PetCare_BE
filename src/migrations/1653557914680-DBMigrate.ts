import { MigrationInterface, QueryRunner } from "typeorm";

export class DBMigrate1653557914680 implements MigrationInterface {
  name = "DBMigrate1653557914680";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" DROP CONSTRAINT "FK_a57034968c0d215bfbb2373d1c7"',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" DROP CONSTRAINT "FK_390f0903b50b7b649bee2c5bf69"',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" DROP COLUMN "provisionalTotal"',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" DROP COLUMN "discount"',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" DROP COLUMN "promotionId"',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" DROP COLUMN "provisionalTotal"',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" DROP COLUMN "discount"',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" DROP COLUMN "promotionId"',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" ADD "point" integer',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ADD "point" integer',
    );
    await queryRunner.query(
      'ALTER TABLE "vaccine_pet_record" ALTER COLUMN "dateOfInjection" SET DEFAULT \'"2022-05-26T09:38:37.768Z"\'',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "vaccine_pet_record" ALTER COLUMN "dateOfInjection" SET DEFAULT \'2022-05-25 08:36:37.485\'',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" DROP COLUMN "point"',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" DROP COLUMN "point"',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ADD "promotionId" integer',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ADD "discount" integer NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ADD "provisionalTotal" integer NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" ADD "promotionId" integer',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" ADD "discount" integer',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" ADD "provisionalTotal" integer',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ADD CONSTRAINT "FK_390f0903b50b7b649bee2c5bf69" FOREIGN KEY ("promotionId") REFERENCES "promotion"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" ADD CONSTRAINT "FK_a57034968c0d215bfbb2373d1c7" FOREIGN KEY ("promotionId") REFERENCES "promotion"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }
}
