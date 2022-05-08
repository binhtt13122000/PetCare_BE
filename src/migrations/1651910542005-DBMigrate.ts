import { MigrationInterface, QueryRunner } from "typeorm";

export class DBMigrate1651910542005 implements MigrationInterface {
  name = "DBMigrate1651910542005";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "staff" RENAME COLUMN "accountId" TO "isActive"',
    );
    await queryRunner.query(
      'ALTER TABLE "customer" RENAME COLUMN "accountId" TO "isActive"',
    );
    await queryRunner.query('ALTER TABLE "account" DROP COLUMN "email"');
    await queryRunner.query(
      'ALTER TABLE "vaccine_pet_record" ALTER COLUMN "dateOfInjection" SET DEFAULT \'"2022-05-07T08:02:26.042Z"\'',
    );
    await queryRunner.query('ALTER TABLE "staff" DROP COLUMN "isActive"');
    await queryRunner.query(
      'ALTER TABLE "staff" ADD "isActive" boolean NOT NULL DEFAULT true',
    );
    await queryRunner.query('ALTER TABLE "customer" DROP COLUMN "isActive"');
    await queryRunner.query(
      'ALTER TABLE "customer" ADD "isActive" boolean NOT NULL DEFAULT true',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "customer" DROP COLUMN "isActive"');
    await queryRunner.query(
      'ALTER TABLE "customer" ADD "isActive" integer NOT NULL',
    );
    await queryRunner.query('ALTER TABLE "staff" DROP COLUMN "isActive"');
    await queryRunner.query(
      'ALTER TABLE "staff" ADD "isActive" integer NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "vaccine_pet_record" ALTER COLUMN "dateOfInjection" SET DEFAULT \'2022-05-05 06:36:52.584\'',
    );
    await queryRunner.query('ALTER TABLE "account" ADD "email" text');
    await queryRunner.query(
      'ALTER TABLE "customer" RENAME COLUMN "isActive" TO "accountId"',
    );
    await queryRunner.query(
      'ALTER TABLE "staff" RENAME COLUMN "isActive" TO "accountId"',
    );
  }
}
