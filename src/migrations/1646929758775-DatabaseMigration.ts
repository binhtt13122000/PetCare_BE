import { MigrationInterface, QueryRunner } from "typeorm";

export class DatabaseMigration1646929758775 implements MigrationInterface {
  name = "DatabaseMigration1646929758775";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "ticket" ALTER COLUMN "date" SET DEFAULT \'"2022-03-10T16:29:21.748Z"\'',
    );
    await queryRunner.query(
      'ALTER TABLE "post" ALTER COLUMN "reasonCancel" DROP NOT NULL',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "post" ALTER COLUMN "reasonCancel" SET NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "ticket" ALTER COLUMN "date" SET DEFAULT \'2022-03-10\'',
    );
  }
}
