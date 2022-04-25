import { MigrationInterface, QueryRunner } from "typeorm";

export class DBMigrate1650852106966 implements MigrationInterface {
  name = "DBMigrate1650852106966";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "staff" RENAME COLUMN "start" TO "star"',
    );
    await queryRunner.query(
      'ALTER TABLE "customer" RENAME COLUMN "start" TO "star"',
    );
    await queryRunner.query(
      'ALTER TABLE "post" ADD "isVaccineInject" boolean NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "vaccine_pet_record" ALTER COLUMN "dateOfInjection" SET DEFAULT \'"2022-04-25T02:01:51.137Z"\'',
    );
    await queryRunner.query('DROP TABLE IF EXISTS "category"');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "vaccine_pet_record" ALTER COLUMN "dateOfInjection" SET DEFAULT \'2022-04-21 08:39:48.992\'',
    );
    await queryRunner.query('ALTER TABLE "post" DROP COLUMN "isVaccineInject"');
    await queryRunner.query(
      'ALTER TABLE "customer" RENAME COLUMN "star" TO "start"',
    );
    await queryRunner.query(
      'ALTER TABLE "staff" RENAME COLUMN "star" TO "start"',
    );
  }
}
