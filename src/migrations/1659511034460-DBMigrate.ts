import { MigrationInterface, QueryRunner } from "typeorm";

export class DBMigrate1659511034460 implements MigrationInterface {
  name = "DBMigrate1659511034460";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TYPE "public"."ticket_type_enum" RENAME TO "ticket_type_enum_old"',
    );
    await queryRunner.query(
      "CREATE TYPE \"public\".\"ticket_type_enum\" AS ENUM('SERVICE', 'COMBO', 'POST', 'BREED')",
    );
    await queryRunner.query(
      'ALTER TABLE "ticket" ALTER COLUMN "type" TYPE "public"."ticket_type_enum" USING "type"::"text"::"public"."ticket_type_enum"',
    );
    await queryRunner.query('DROP TYPE "public"."ticket_type_enum_old"');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "CREATE TYPE \"public\".\"ticket_type_enum_old\" AS ENUM('SERVICE', 'COMBO', 'POST')",
    );
    await queryRunner.query(
      'ALTER TABLE "ticket" ALTER COLUMN "type" TYPE "public"."ticket_type_enum_old" USING "type"::"text"::"public"."ticket_type_enum_old"',
    );
    await queryRunner.query('DROP TYPE "public"."ticket_type_enum"');
    await queryRunner.query(
      'ALTER TYPE "public"."ticket_type_enum_old" RENAME TO "ticket_type_enum"',
    );
  }
}
