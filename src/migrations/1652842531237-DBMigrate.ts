import { MigrationInterface, QueryRunner } from "typeorm";

export class DBMigrate1652842531237 implements MigrationInterface {
  name = "DBMigrate1652842531237";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "order_detail" ADD "quantity" integer',
    );
    await queryRunner.query(
      'ALTER TABLE "order_detail" ADD "totalPrice" integer',
    );
    await queryRunner.query(
      'ALTER TABLE "order" ADD "registerTime" TIMESTAMP DEFAULT now()',
    );
    await queryRunner.query(
      'ALTER TABLE "vaccine_pet_record" ALTER COLUMN "dateOfInjection" SET DEFAULT \'"2022-05-18T02:55:35.977Z"\'',
    );
    await queryRunner.query(
      'ALTER TYPE "public"."ticket_status_enum" RENAME TO "ticket_status_enum_old"',
    );
    await queryRunner.query(
      "CREATE TYPE \"public\".\"ticket_status_enum\" AS ENUM('CREATED', 'CONFIRMED', 'CANCELED', 'SUCCESS', 'EXPIRED')",
    );
    await queryRunner.query(
      'ALTER TABLE "ticket" ALTER COLUMN "status" TYPE "public"."ticket_status_enum" USING "status"::"text"::"public"."ticket_status_enum"',
    );
    await queryRunner.query('DROP TYPE "public"."ticket_status_enum_old"');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "CREATE TYPE \"public\".\"ticket_status_enum_old\" AS ENUM('REQUESTED', 'CANCELLED', 'CONFIRMED')",
    );
    await queryRunner.query(
      'ALTER TABLE "ticket" ALTER COLUMN "status" TYPE "public"."ticket_status_enum_old" USING "status"::"text"::"public"."ticket_status_enum_old"',
    );
    await queryRunner.query('DROP TYPE "public"."ticket_status_enum"');
    await queryRunner.query(
      'ALTER TYPE "public"."ticket_status_enum_old" RENAME TO "ticket_status_enum"',
    );
    await queryRunner.query(
      'ALTER TABLE "vaccine_pet_record" ALTER COLUMN "dateOfInjection" SET DEFAULT \'2022-05-14 21:37:00.179\'',
    );
    await queryRunner.query('ALTER TABLE "order" DROP COLUMN "registerTime"');
    await queryRunner.query(
      'ALTER TABLE "order_detail" DROP COLUMN "totalPrice"',
    );
    await queryRunner.query(
      'ALTER TABLE "order_detail" DROP COLUMN "quantity"',
    );
  }
}
