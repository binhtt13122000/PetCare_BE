import { MigrationInterface, QueryRunner } from "typeorm";

export class DBMigrate1650852366215 implements MigrationInterface {
  name = "DBMigrate1650852366215";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "pet" DROP COLUMN "ageRange"');
    await queryRunner.query('ALTER TABLE "staff" ADD "email" text');
    await queryRunner.query(
      'ALTER TABLE "staff" ADD "firstName" text NOT NULL',
    );
    await queryRunner.query('ALTER TABLE "staff" ADD "lastName" text NOT NULL');
    await queryRunner.query(
      'ALTER TABLE "staff" ADD "phoneNumber" text NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "staff" ADD CONSTRAINT "UQ_d58b5a97116316c23a3bf507d37" UNIQUE ("phoneNumber")',
    );
    await queryRunner.query('ALTER TABLE "staff" ADD "address" text');
    await queryRunner.query(
      "CREATE TYPE \"public\".\"staff_gender_enum\" AS ENUM('MALE', 'FEMALE', 'UNKNOWN')",
    );
    await queryRunner.query(
      'ALTER TABLE "staff" ADD "gender" "public"."staff_gender_enum" NOT NULL DEFAULT \'MALE\'',
    );
    await queryRunner.query('ALTER TABLE "staff" ADD "avatar" text');
    await queryRunner.query('ALTER TABLE "customer" ADD "email" text');
    await queryRunner.query(
      'ALTER TABLE "customer" ADD "firstName" text NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "customer" ADD "lastName" text NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "customer" ADD "phoneNumber" text NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "customer" ADD CONSTRAINT "UQ_2e64383bae8871598afb8b73f0d" UNIQUE ("phoneNumber")',
    );
    await queryRunner.query('ALTER TABLE "customer" ADD "address" text');
    await queryRunner.query(
      "CREATE TYPE \"public\".\"customer_gender_enum\" AS ENUM('MALE', 'FEMALE', 'UNKNOWN')",
    );
    await queryRunner.query(
      'ALTER TABLE "customer" ADD "gender" "public"."customer_gender_enum" NOT NULL DEFAULT \'MALE\'',
    );
    await queryRunner.query('ALTER TABLE "customer" ADD "avatar" text');
    await queryRunner.query(
      'ALTER TABLE "vaccine_pet_record" ALTER COLUMN "dateOfInjection" SET DEFAULT \'"2022-04-25T02:06:09.499Z"\'',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "vaccine_pet_record" ALTER COLUMN "dateOfInjection" SET DEFAULT \'2022-04-25 02:01:51.137\'',
    );
    await queryRunner.query('ALTER TABLE "customer" DROP COLUMN "avatar"');
    await queryRunner.query('ALTER TABLE "customer" DROP COLUMN "gender"');
    await queryRunner.query('DROP TYPE "public"."customer_gender_enum"');
    await queryRunner.query('ALTER TABLE "customer" DROP COLUMN "address"');
    await queryRunner.query(
      'ALTER TABLE "customer" DROP CONSTRAINT "UQ_2e64383bae8871598afb8b73f0d"',
    );
    await queryRunner.query('ALTER TABLE "customer" DROP COLUMN "phoneNumber"');
    await queryRunner.query('ALTER TABLE "customer" DROP COLUMN "lastName"');
    await queryRunner.query('ALTER TABLE "customer" DROP COLUMN "firstName"');
    await queryRunner.query('ALTER TABLE "customer" DROP COLUMN "email"');
    await queryRunner.query('ALTER TABLE "staff" DROP COLUMN "avatar"');
    await queryRunner.query('ALTER TABLE "staff" DROP COLUMN "gender"');
    await queryRunner.query('DROP TYPE "public"."staff_gender_enum"');
    await queryRunner.query('ALTER TABLE "staff" DROP COLUMN "address"');
    await queryRunner.query(
      'ALTER TABLE "staff" DROP CONSTRAINT "UQ_d58b5a97116316c23a3bf507d37"',
    );
    await queryRunner.query('ALTER TABLE "staff" DROP COLUMN "phoneNumber"');
    await queryRunner.query('ALTER TABLE "staff" DROP COLUMN "lastName"');
    await queryRunner.query('ALTER TABLE "staff" DROP COLUMN "firstName"');
    await queryRunner.query('ALTER TABLE "staff" DROP COLUMN "email"');
    await queryRunner.query('ALTER TABLE "pet" ADD "ageRange" integer');
  }
}
