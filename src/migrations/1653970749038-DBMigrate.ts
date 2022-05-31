import { MigrationInterface, QueryRunner } from "typeorm";

export class DBMigrate1653970749038 implements MigrationInterface {
  name = "DBMigrate1653970749038";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "vaccine_pet_record" ALTER COLUMN "dateOfInjection" SET DEFAULT \'"2022-05-31T04:19:12.763Z"\'',
    );
    await queryRunner.query(
      'ALTER TYPE "public"."post_type_enum" RENAME TO "post_type_enum_old"',
    );
    await queryRunner.query(
      "CREATE TYPE \"public\".\"post_type_enum\" AS ENUM('SALE', 'BREED')",
    );
    await queryRunner.query(
      'ALTER TABLE "post" ALTER COLUMN "type" TYPE "public"."post_type_enum" USING "type"::"text"::"public"."post_type_enum"',
    );
    await queryRunner.query('DROP TYPE "public"."post_type_enum_old"');
    await queryRunner.query(
      'ALTER TYPE "public"."transaction_fee_type_enum" RENAME TO "transaction_fee_type_enum_old"',
    );
    await queryRunner.query(
      "CREATE TYPE \"public\".\"transaction_fee_type_enum\" AS ENUM('SALE', 'BREED')",
    );
    await queryRunner.query(
      'ALTER TABLE "transaction_fee" ALTER COLUMN "type" TYPE "public"."transaction_fee_type_enum" USING "type"::"text"::"public"."transaction_fee_type_enum"',
    );
    await queryRunner.query(
      'DROP TYPE "public"."transaction_fee_type_enum_old"',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "CREATE TYPE \"public\".\"transaction_fee_type_enum_old\" AS ENUM('PURCHASE', 'BREED')",
    );
    await queryRunner.query(
      'ALTER TABLE "transaction_fee" ALTER COLUMN "type" TYPE "public"."transaction_fee_type_enum_old" USING "type"::"text"::"public"."transaction_fee_type_enum_old"',
    );
    await queryRunner.query('DROP TYPE "public"."transaction_fee_type_enum"');
    await queryRunner.query(
      'ALTER TYPE "public"."transaction_fee_type_enum_old" RENAME TO "transaction_fee_type_enum"',
    );
    await queryRunner.query(
      "CREATE TYPE \"public\".\"post_type_enum_old\" AS ENUM('PURCHASE', 'BREED')",
    );
    await queryRunner.query(
      'ALTER TABLE "post" ALTER COLUMN "type" TYPE "public"."post_type_enum_old" USING "type"::"text"::"public"."post_type_enum_old"',
    );
    await queryRunner.query('DROP TYPE "public"."post_type_enum"');
    await queryRunner.query(
      'ALTER TYPE "public"."post_type_enum_old" RENAME TO "post_type_enum"',
    );
    await queryRunner.query(
      'ALTER TABLE "vaccine_pet_record" ALTER COLUMN "dateOfInjection" SET DEFAULT \'2022-05-31 04:00:53.477\'',
    );
  }
}
