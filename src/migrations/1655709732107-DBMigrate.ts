import { MigrationInterface, QueryRunner } from "typeorm";

export class DBMigrate1655709732107 implements MigrationInterface {
  name = "DBMigrate1655709732107";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TYPE "public"."pet_status_enum" RENAME TO "pet_status_enum_old"',
    );
    await queryRunner.query(
      "CREATE TYPE \"public\".\"pet_status_enum\" AS ENUM('DELETED', 'NORMAL', 'IN_POST', 'IN_BREED')",
    );
    await queryRunner.query(
      'ALTER TABLE "pet" ALTER COLUMN "status" TYPE "public"."pet_status_enum" USING "status"::"text"::"public"."pet_status_enum"',
    );
    await queryRunner.query('DROP TYPE "public"."pet_status_enum_old"');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "CREATE TYPE \"public\".\"pet_status_enum_old\" AS ENUM('DELETED', 'NORMAL', 'IN_POST')",
    );
    await queryRunner.query(
      'ALTER TABLE "pet" ALTER COLUMN "status" TYPE "public"."pet_status_enum_old" USING "status"::"text"::"public"."pet_status_enum_old"',
    );
    await queryRunner.query('DROP TYPE "public"."pet_status_enum"');
    await queryRunner.query(
      'ALTER TYPE "public"."pet_status_enum_old" RENAME TO "pet_status_enum"',
    );
  }
}
