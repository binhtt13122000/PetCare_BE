import { MigrationInterface, QueryRunner } from "typeorm";

export class DatabaseMigration1646712525314 implements MigrationInterface {
  name = "DatabaseMigration1646712525314";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "media" DROP CONSTRAINT "FK_8c9880aec82e6465142f31de240"',
    );
    await queryRunner.query('ALTER TABLE "media" DROP COLUMN "petId"');
    await queryRunner.query(
      'ALTER TABLE "ticket" ALTER COLUMN "date" SET DEFAULT \'"2022-03-08T04:08:48.404Z"\'',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "ticket" ALTER COLUMN "date" SET DEFAULT \'2022-03-07\'',
    );
    await queryRunner.query('ALTER TABLE "media" ADD "petId" integer');
    await queryRunner.query(
      'ALTER TABLE "media" ADD CONSTRAINT "FK_8c9880aec82e6465142f31de240" FOREIGN KEY ("petId") REFERENCES "pet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }
}
