import { MigrationInterface, QueryRunner } from "typeorm";

export class DBMigrate1651732608167 implements MigrationInterface {
  name = "DBMigrate1651732608167";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "account" DROP COLUMN "firstName"');
    await queryRunner.query('ALTER TABLE "account" DROP COLUMN "lastName"');
    await queryRunner.query('ALTER TABLE "account" DROP COLUMN "address"');
    await queryRunner.query('ALTER TABLE "account" DROP COLUMN "avatar"');
    await queryRunner.query('ALTER TABLE "account" DROP COLUMN "dateOfBirth"');
    await queryRunner.query('ALTER TABLE "account" DROP COLUMN "gender"');
    await queryRunner.query('DROP TYPE "public"."account_gender_enum"');
    await queryRunner.query(
      'ALTER TABLE "vaccine_pet_record" ALTER COLUMN "dateOfInjection" SET DEFAULT \'"2022-05-05T06:36:52.584Z"\'',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "vaccine_pet_record" ALTER COLUMN "dateOfInjection" SET DEFAULT \'2022-05-05 04:47:52.209\'',
    );
    await queryRunner.query(
      "CREATE TYPE \"public\".\"account_gender_enum\" AS ENUM('MALE', 'FEMALE', 'UNKNOWN')",
    );
    await queryRunner.query(
      'ALTER TABLE "account" ADD "gender" "public"."account_gender_enum" NOT NULL DEFAULT \'MALE\'',
    );
    await queryRunner.query(
      'ALTER TABLE "account" ADD "dateOfBirth" TIMESTAMP',
    );
    await queryRunner.query('ALTER TABLE "account" ADD "avatar" text');
    await queryRunner.query('ALTER TABLE "account" ADD "address" text');
    await queryRunner.query(
      'ALTER TABLE "account" ADD "lastName" text NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "account" ADD "firstName" text NOT NULL',
    );
  }
}
