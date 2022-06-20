import { MigrationInterface, QueryRunner } from "typeorm";

export class DBMigrate1655696430852 implements MigrationInterface {
  name = "DBMigrate1655696430852";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "service" DROP COLUMN "isHealthCheck"',
    );
    await queryRunner.query(
      'ALTER TABLE "service" DROP COLUMN "healthCheckTemplate"',
    );
    await queryRunner.query('DROP TABLE "health_service"');
    await queryRunner.query('DROP TABLE "health_record"');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "service" ADD "healthCheckTemplate" text',
    );
    await queryRunner.query(
      'ALTER TABLE "service" ADD "isHealthCheck" boolean NOT NULL DEFAULT true',
    );
  }
}
