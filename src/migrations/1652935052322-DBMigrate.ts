import { MigrationInterface, QueryRunner } from "typeorm";

export class DBMigrate1652935052322 implements MigrationInterface {
  name = "DBMigrate1652935052322";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "promotion" DROP CONSTRAINT "FK_31978ae88936dc7ce25adf089fc"',
    );
    await queryRunner.query('ALTER TABLE "promotion" DROP COLUMN "customerId"');
    await queryRunner.query('ALTER TABLE "branch" ADD "name" text');
    await queryRunner.query(
      'ALTER TABLE "promotion" ADD "point" integer DEFAULT \'0\'',
    );
    await queryRunner.query('ALTER TABLE "promotion" ADD "branchId" integer');
    await queryRunner.query(
      'ALTER TABLE "vaccine_pet_record" ALTER COLUMN "dateOfInjection" SET DEFAULT \'"2022-05-19T04:37:35.872Z"\'',
    );
    await queryRunner.query(
      'ALTER TABLE "promotion" ADD CONSTRAINT "FK_1f6970afc51cf24dff2ad314d54" FOREIGN KEY ("branchId") REFERENCES "branch"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "promotion" DROP CONSTRAINT "FK_1f6970afc51cf24dff2ad314d54"',
    );
    await queryRunner.query(
      'ALTER TABLE "vaccine_pet_record" ALTER COLUMN "dateOfInjection" SET DEFAULT \'2022-05-18 08:46:45.014\'',
    );
    await queryRunner.query('ALTER TABLE "promotion" DROP COLUMN "branchId"');
    await queryRunner.query('ALTER TABLE "promotion" DROP COLUMN "point"');
    await queryRunner.query('ALTER TABLE "branch" DROP COLUMN "name"');
    await queryRunner.query('ALTER TABLE "promotion" ADD "customerId" integer');
    await queryRunner.query(
      'ALTER TABLE "promotion" ADD CONSTRAINT "FK_31978ae88936dc7ce25adf089fc" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }
}
