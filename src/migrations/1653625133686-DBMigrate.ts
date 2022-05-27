import { MigrationInterface, QueryRunner } from "typeorm";

export class DBMigrate1653625133686 implements MigrationInterface {
  name = "DBMigrate1653625133686";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" ADD "branchId" integer',
    );
    await queryRunner.query(
      'ALTER TABLE "vaccine_pet_record" ALTER COLUMN "dateOfInjection" SET DEFAULT \'"2022-05-27T04:18:58.198Z"\'',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" ADD CONSTRAINT "FK_d61d07f4459785d2483de1ccbbe" FOREIGN KEY ("branchId") REFERENCES "branch"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" DROP CONSTRAINT "FK_d61d07f4459785d2483de1ccbbe"',
    );
    await queryRunner.query(
      'ALTER TABLE "vaccine_pet_record" ALTER COLUMN "dateOfInjection" SET DEFAULT \'2022-05-26 09:38:37.768\'',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" DROP COLUMN "branchId"',
    );
  }
}
