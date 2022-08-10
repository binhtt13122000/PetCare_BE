import { MigrationInterface, QueryRunner } from "typeorm";

export class DBMigrate1660146207091 implements MigrationInterface {
  name = "DBMigrate1660146207091";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "service" ADD "speciesId" integer');
    await queryRunner.query(
      'ALTER TABLE "service" ADD CONSTRAINT "FK_8768b8dbcf6f47771b2a6f2ae80" FOREIGN KEY ("speciesId") REFERENCES "species"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "service" DROP CONSTRAINT "FK_8768b8dbcf6f47771b2a6f2ae80"',
    );
    await queryRunner.query('ALTER TABLE "service" DROP COLUMN "speciesId"');
  }
}
