import { MigrationInterface, QueryRunner } from "typeorm";

export class DBMigrate1653371966537 implements MigrationInterface {
  name = "DBMigrate1653371966537";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "CREATE TYPE \"public\".\"transaction_fee_type_enum\" AS ENUM('PURCHASE', 'BREED')",
    );
    await queryRunner.query(
      'ALTER TABLE "transaction_fee" ADD "type" "public"."transaction_fee_type_enum"',
    );
    await queryRunner.query(
      'ALTER TABLE "vaccine_pet_record" ALTER COLUMN "dateOfInjection" SET DEFAULT \'"2022-05-24T05:59:29.883Z"\'',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "vaccine_pet_record" ALTER COLUMN "dateOfInjection" SET DEFAULT \'2022-05-23 06:49:10.881\'',
    );
    await queryRunner.query('ALTER TABLE "transaction_fee" DROP COLUMN "type"');
    await queryRunner.query('DROP TYPE "public"."transaction_fee_type_enum"');
  }
}
