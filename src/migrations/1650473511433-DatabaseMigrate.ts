import { MigrationInterface, QueryRunner } from "typeorm";

export class DatabaseMigrate1650473511433 implements MigrationInterface {
  name = "DatabaseMigrate1650473511433";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "account" DROP COLUMN "isMale"');
    await queryRunner.query(
      "CREATE TYPE \"public\".\"account_gender_enum\" AS ENUM('MALE', 'FEMALE', 'UNKNOWN')",
    );
    await queryRunner.query(
      'ALTER TABLE "account" ADD "gender" "public"."account_gender_enum" NOT NULL DEFAULT \'MALE\'',
    );
    await queryRunner.query(
      'ALTER TABLE "account" ADD "currentHashedRefreshToken" character varying',
    );
    await queryRunner.query(
      'ALTER TABLE "vaccine_pet_record" ALTER COLUMN "dateOfInjection" SET DEFAULT \'"2022-04-20T16:51:55.005Z"\'',
    );
    await queryRunner.query('ALTER TABLE "paper" DROP COLUMN "type"');
    await queryRunner.query(
      "CREATE TYPE \"public\".\"paper_type_enum\" AS ENUM('CERTIFICATE', 'PRIZE')",
    );
    await queryRunner.query(
      'ALTER TABLE "paper" ADD "type" "public"."paper_type_enum" NOT NULL DEFAULT \'CERTIFICATE\'',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "paper" DROP COLUMN "type"');
    await queryRunner.query('DROP TYPE "public"."paper_type_enum"');
    await queryRunner.query('ALTER TABLE "paper" ADD "type" text NOT NULL');
    await queryRunner.query(
      'ALTER TABLE "vaccine_pet_record" ALTER COLUMN "dateOfInjection" SET DEFAULT \'2022-04-20 09:03:47.415\'',
    );
    await queryRunner.query(
      'ALTER TABLE "account" DROP COLUMN "currentHashedRefreshToken"',
    );
    await queryRunner.query('ALTER TABLE "account" DROP COLUMN "gender"');
    await queryRunner.query('DROP TYPE "public"."account_gender_enum"');
    await queryRunner.query(
      'ALTER TABLE "account" ADD "isMale" boolean NOT NULL',
    );
  }
}
