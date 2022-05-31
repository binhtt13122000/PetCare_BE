import { MigrationInterface, QueryRunner } from "typeorm";

export class DBMigrate1653990215990 implements MigrationInterface {
  name = "DBMigrate1653990215990";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" ADD "cancelTime" TIMESTAMP',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ADD "cancelTime" TIMESTAMP',
    );
    await queryRunner.query(
      'ALTER TABLE "vaccine_pet_record" ALTER COLUMN "dateOfInjection" DROP DEFAULT',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "vaccine_pet_record" ALTER COLUMN "dateOfInjection" SET DEFAULT \'2022-05-31 04:19:12.763\'',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" DROP COLUMN "cancelTime"',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" DROP COLUMN "cancelTime"',
    );
  }
}
