import { MigrationInterface, QueryRunner } from "typeorm";

export class DatabaseMigration1647409918904 implements MigrationInterface {
  name = "DatabaseMigration1647409918904";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" ADD "createTime" TIMESTAMP NOT NULL DEFAULT now()',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" ADD "postId" integer',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ADD "createTime" TIMESTAMP NOT NULL DEFAULT now()',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ADD "postId" integer',
    );
    await queryRunner.query(
      'ALTER TABLE "ticket" ALTER COLUMN "date" SET DEFAULT \'"2022-03-16T05:52:02.444Z"\'',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" ADD CONSTRAINT "FK_af006457683248f5e83792b695d" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ADD CONSTRAINT "FK_06b72bba47b6cd43e305ae0a31c" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" DROP CONSTRAINT "FK_06b72bba47b6cd43e305ae0a31c"',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" DROP CONSTRAINT "FK_af006457683248f5e83792b695d"',
    );
    await queryRunner.query(
      'ALTER TABLE "ticket" ALTER COLUMN "date" SET DEFAULT \'2022-03-15\'',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" DROP COLUMN "postId"',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" DROP COLUMN "createTime"',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" DROP COLUMN "postId"',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" DROP COLUMN "createTime"',
    );
  }
}
