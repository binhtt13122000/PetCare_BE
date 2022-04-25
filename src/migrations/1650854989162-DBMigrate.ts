import { MigrationInterface, QueryRunner } from "typeorm";

export class DBMigrate1650854989162 implements MigrationInterface {
  name = "DBMigrate1650854989162";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "post" DROP COLUMN "sellerId"');
    await queryRunner.query(
      'ALTER TABLE "post" DROP CONSTRAINT "FK_aebb8a0ec1db37cc905a556b3aa"',
    );
    await queryRunner.query(
      'ALTER TABLE "post" ALTER COLUMN "customerId" SET NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "vaccine_pet_record" ALTER COLUMN "dateOfInjection" SET DEFAULT \'"2022-04-25T02:49:52.991Z"\'',
    );
    await queryRunner.query(
      'ALTER TABLE "post" ADD CONSTRAINT "FK_aebb8a0ec1db37cc905a556b3aa" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "post" DROP CONSTRAINT "FK_aebb8a0ec1db37cc905a556b3aa"',
    );
    await queryRunner.query(
      'ALTER TABLE "vaccine_pet_record" ALTER COLUMN "dateOfInjection" SET DEFAULT \'2022-04-25 02:06:09.499\'',
    );
    await queryRunner.query(
      'ALTER TABLE "post" ALTER COLUMN "customerId" DROP NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "post" ADD CONSTRAINT "FK_aebb8a0ec1db37cc905a556b3aa" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "post" ADD "sellerId" integer NOT NULL',
    );
  }
}
