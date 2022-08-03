import { MigrationInterface, QueryRunner } from "typeorm";

export class DBMigrate1659518800814 implements MigrationInterface {
  name = "DBMigrate1659518800814";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "branch" ADD "accountId" integer');
    await queryRunner.query('ALTER TABLE "customer" ADD "accountId" integer');
    await queryRunner.query(
      'ALTER TABLE "branch" ADD CONSTRAINT "FK_0d2c4c3b3c22f5a05c4004d13fb" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "customer" ADD CONSTRAINT "FK_c97c8c28cd65bdc7a3dcd26af5c" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "customer" DROP CONSTRAINT "FK_c97c8c28cd65bdc7a3dcd26af5c"',
    );
    await queryRunner.query(
      'ALTER TABLE "branch" DROP CONSTRAINT "FK_0d2c4c3b3c22f5a05c4004d13fb"',
    );
    await queryRunner.query('ALTER TABLE "customer" DROP COLUMN "accountId"');
    await queryRunner.query('ALTER TABLE "branch" DROP COLUMN "accountId"');
  }
}
