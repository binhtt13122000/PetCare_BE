import { MigrationInterface, QueryRunner } from "typeorm";

export class DBMigrate1658112780051 implements MigrationInterface {
  name = "DBMigrate1658112780051";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "CREATE TYPE \"public\".\"ticket_type_enum\" AS ENUM('SERVICE', 'COMBO', 'POST')",
    );
    await queryRunner.query(
      'ALTER TABLE "ticket" ADD "type" "public"."ticket_type_enum"',
    );
    await queryRunner.query(
      "CREATE TYPE \"public\".\"service_type_enum\" AS ENUM('VACCINE', 'HELMINTHIC', 'TICKS', 'MICROCHIP', 'NORMAL', 'BREED')",
    );
    await queryRunner.query(
      'ALTER TABLE "service" ADD "type" "public"."service_type_enum"',
    );
    await queryRunner.query('ALTER TABLE "service" ADD "vaccineId" integer');
    await queryRunner.query(
      'ALTER TABLE "service" ADD CONSTRAINT "FK_2eef03a4eb2e48fbcfa3b6a6f3b" FOREIGN KEY ("vaccineId") REFERENCES "vaccine"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "service" DROP CONSTRAINT "FK_2eef03a4eb2e48fbcfa3b6a6f3b"',
    );
    await queryRunner.query('ALTER TABLE "service" DROP COLUMN "vaccineId"');
    await queryRunner.query('ALTER TABLE "service" DROP COLUMN "type"');
    await queryRunner.query('DROP TYPE "public"."service_type_enum"');
    await queryRunner.query('ALTER TABLE "ticket" DROP COLUMN "type"');
    await queryRunner.query('DROP TYPE "public"."ticket_type_enum"');
  }
}
