import { MigrationInterface, QueryRunner } from "typeorm";

export class DBMigrate1653901626421 implements MigrationInterface {
  name = "DBMigrate1653901626421";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "report" ALTER COLUMN "createdTime" DROP DEFAULT',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ALTER COLUMN "createdTime" DROP DEFAULT',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" ALTER COLUMN "createdTime" DROP DEFAULT',
    );
    await queryRunner.query(
      'ALTER TABLE "post" ALTER COLUMN "createTime" DROP DEFAULT',
    );
    await queryRunner.query(
      'ALTER TABLE "vaccine" ADD CONSTRAINT "UQ_b3834b610ce59fa7f6a20e90b8a" UNIQUE ("name")',
    );
    await queryRunner.query(
      'ALTER TABLE "vaccine_pet_record" ALTER COLUMN "dateOfInjection" SET DEFAULT \'"2022-05-30T09:07:10.200Z"\'',
    );
    await queryRunner.query(
      'ALTER TABLE "branch" ALTER COLUMN "name" SET NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "branch" ADD CONSTRAINT "UQ_d6d14945d4352867ecc62bcf85c" UNIQUE ("name")',
    );
    await queryRunner.query(
      'ALTER TABLE "ticket" ALTER COLUMN "createdTime" DROP DEFAULT',
    );
    await queryRunner.query(
      'ALTER TABLE "service" ADD CONSTRAINT "UQ_7806a14d42c3244064b4a1706ca" UNIQUE ("name")',
    );
    await queryRunner.query(
      'ALTER TABLE "order" ALTER COLUMN "registerTime" DROP DEFAULT',
    );
    await queryRunner.query(
      'ALTER TABLE "species" ADD CONSTRAINT "UQ_1adf701cac3b2c0f8bacb54774b" UNIQUE ("name")',
    );
    await queryRunner.query(
      'ALTER TABLE "breed" ADD CONSTRAINT "UQ_114e1e2099cad7d73a7f0119604" UNIQUE ("name")',
    );
    await queryRunner.query(
      'ALTER TABLE "account" ALTER COLUMN "registerTime" DROP DEFAULT',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "account" ALTER COLUMN "registerTime" SET DEFAULT now()',
    );
    await queryRunner.query(
      'ALTER TABLE "breed" DROP CONSTRAINT "UQ_114e1e2099cad7d73a7f0119604"',
    );
    await queryRunner.query(
      'ALTER TABLE "species" DROP CONSTRAINT "UQ_1adf701cac3b2c0f8bacb54774b"',
    );
    await queryRunner.query(
      'ALTER TABLE "order" ALTER COLUMN "registerTime" SET DEFAULT now()',
    );
    await queryRunner.query(
      'ALTER TABLE "service" DROP CONSTRAINT "UQ_7806a14d42c3244064b4a1706ca"',
    );
    await queryRunner.query(
      'ALTER TABLE "ticket" ALTER COLUMN "createdTime" SET DEFAULT now()',
    );
    await queryRunner.query(
      'ALTER TABLE "branch" DROP CONSTRAINT "UQ_d6d14945d4352867ecc62bcf85c"',
    );
    await queryRunner.query(
      'ALTER TABLE "branch" ALTER COLUMN "name" DROP NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "vaccine_pet_record" ALTER COLUMN "dateOfInjection" SET DEFAULT \'2022-05-27 04:18:58.198\'',
    );
    await queryRunner.query(
      'ALTER TABLE "vaccine" DROP CONSTRAINT "UQ_b3834b610ce59fa7f6a20e90b8a"',
    );
    await queryRunner.query(
      'ALTER TABLE "post" ALTER COLUMN "createTime" SET DEFAULT now()',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" ALTER COLUMN "createdTime" SET DEFAULT now()',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ALTER COLUMN "createdTime" SET DEFAULT now()',
    );
    await queryRunner.query(
      'ALTER TABLE "report" ALTER COLUMN "createdTime" SET DEFAULT now()',
    );
  }
}
