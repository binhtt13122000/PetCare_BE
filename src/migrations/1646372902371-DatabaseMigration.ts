import { MigrationInterface, QueryRunner } from "typeorm";

export class DatabaseMigration1646372902371 implements MigrationInterface {
  name = "DatabaseMigration1646372902371";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "promotion" ADD "accountId" integer');
    await queryRunner.query('ALTER TABLE "media" ADD "roleId" integer');
    await queryRunner.query(
      'ALTER TABLE "verification_center" ADD "address" text NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "ticket" ALTER COLUMN "date" SET DEFAULT \'"2022-03-04T05:48:25.649Z"\'',
    );
    await queryRunner.query(
      'ALTER TABLE "promotion" ADD CONSTRAINT "FK_c79d618f2dc8ec58fb2eb677e1e" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "media" ADD CONSTRAINT "FK_6400e332beaf67a74ce38d4c3e4" FOREIGN KEY ("roleId") REFERENCES "ticket"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "media" DROP CONSTRAINT "FK_6400e332beaf67a74ce38d4c3e4"',
    );
    await queryRunner.query(
      'ALTER TABLE "promotion" DROP CONSTRAINT "FK_c79d618f2dc8ec58fb2eb677e1e"',
    );
    await queryRunner.query(
      'ALTER TABLE "ticket" ALTER COLUMN "date" SET DEFAULT \'2022-03-02\'',
    );
    await queryRunner.query(
      'ALTER TABLE "verification_center" DROP COLUMN "address"',
    );
    await queryRunner.query('ALTER TABLE "media" DROP COLUMN "roleId"');
    await queryRunner.query('ALTER TABLE "promotion" DROP COLUMN "accountId"');
  }
}
