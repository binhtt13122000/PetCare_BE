import { MigrationInterface, QueryRunner } from "typeorm";

export class DatabaseMigration1650445423472 implements MigrationInterface {
  name = "DatabaseMigration1650445423472";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "order" ADD "paymentTime" TIMESTAMP');
    await queryRunner.query('ALTER TABLE "order" ADD "paymentMethod" text');
    await queryRunner.query('ALTER TABLE "paper" DROP COLUMN "date"');
    await queryRunner.query(
      'ALTER TABLE "paper" ADD "date" TIMESTAMP NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "vaccine_pet_record" ALTER COLUMN "dateOfInjection" SET DEFAULT \'"2022-04-20T09:03:47.415Z"\'',
    );
    await queryRunner.query(
      'ALTER TABLE "health_record" DROP COLUMN "dateOfExam"',
    );
    await queryRunner.query(
      'ALTER TABLE "health_record" ADD "dateOfExam" TIMESTAMP NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "health_record" DROP COLUMN "nextHealthCheck"',
    );
    await queryRunner.query(
      'ALTER TABLE "health_record" ADD "nextHealthCheck" TIMESTAMP',
    );
    await queryRunner.query(
      'ALTER TYPE "public"."sale_transaction_status_enum" RENAME TO "sale_transaction_status_enum_old"',
    );
    await queryRunner.query(
      "CREATE TYPE \"public\".\"sale_transaction_status_enum\" AS ENUM('CREATED', 'CANCELED', 'REJECTED', 'SUCCESS')",
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" ALTER COLUMN "status" TYPE "public"."sale_transaction_status_enum" USING "status"::"text"::"public"."sale_transaction_status_enum"',
    );
    await queryRunner.query(
      'DROP TYPE "public"."sale_transaction_status_enum_old"',
    );
    await queryRunner.query('ALTER TABLE "pet" DROP COLUMN "dob"');
    await queryRunner.query('ALTER TABLE "pet" ADD "dob" TIMESTAMP NOT NULL');
    await queryRunner.query('ALTER TABLE "pet_owner" DROP COLUMN "date"');
    await queryRunner.query(
      'ALTER TABLE "pet_owner" ADD "date" TIMESTAMP NOT NULL',
    );
    await queryRunner.query('ALTER TABLE "promotion" DROP COLUMN "startTime"');
    await queryRunner.query(
      'ALTER TABLE "promotion" ADD "startTime" TIMESTAMP NOT NULL',
    );
    await queryRunner.query('ALTER TABLE "promotion" DROP COLUMN "expireTime"');
    await queryRunner.query(
      'ALTER TABLE "promotion" ADD "expireTime" TIMESTAMP NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "order" DROP CONSTRAINT "FK_6a6e5cee4d0f7f9f624fe68bc7e"',
    );
    await queryRunner.query(
      'ALTER TYPE "public"."order_status_enum" RENAME TO "order_status_enum_old"',
    );
    await queryRunner.query(
      "CREATE TYPE \"public\".\"order_status_enum\" AS ENUM('SUCCESS', 'WAITING')",
    );
    await queryRunner.query(
      'ALTER TABLE "order" ALTER COLUMN "status" TYPE "public"."order_status_enum" USING "status"::"text"::"public"."order_status_enum"',
    );
    await queryRunner.query('DROP TYPE "public"."order_status_enum_old"');
    await queryRunner.query(
      'ALTER TABLE "order" ALTER COLUMN "promotionId" DROP NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "order" ADD CONSTRAINT "FK_6a6e5cee4d0f7f9f624fe68bc7e" FOREIGN KEY ("promotionId") REFERENCES "promotion"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "order" DROP CONSTRAINT "FK_6a6e5cee4d0f7f9f624fe68bc7e"',
    );
    await queryRunner.query(
      'ALTER TABLE "order" ALTER COLUMN "promotionId" SET NOT NULL',
    );
    await queryRunner.query(
      "CREATE TYPE \"public\".\"order_status_enum_old\" AS ENUM('SUCCESS', 'INFORMATION_ERROR', 'BILLING_ERROR')",
    );
    await queryRunner.query(
      'ALTER TABLE "order" ALTER COLUMN "status" TYPE "public"."order_status_enum_old" USING "status"::"text"::"public"."order_status_enum_old"',
    );
    await queryRunner.query('DROP TYPE "public"."order_status_enum"');
    await queryRunner.query(
      'ALTER TYPE "public"."order_status_enum_old" RENAME TO "order_status_enum"',
    );
    await queryRunner.query(
      'ALTER TABLE "order" ADD CONSTRAINT "FK_6a6e5cee4d0f7f9f624fe68bc7e" FOREIGN KEY ("promotionId") REFERENCES "promotion"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query('ALTER TABLE "promotion" DROP COLUMN "expireTime"');
    await queryRunner.query(
      'ALTER TABLE "promotion" ADD "expireTime" date NOT NULL',
    );
    await queryRunner.query('ALTER TABLE "promotion" DROP COLUMN "startTime"');
    await queryRunner.query(
      'ALTER TABLE "promotion" ADD "startTime" date NOT NULL',
    );
    await queryRunner.query('ALTER TABLE "pet_owner" DROP COLUMN "date"');
    await queryRunner.query('ALTER TABLE "pet_owner" ADD "date" date NOT NULL');
    await queryRunner.query('ALTER TABLE "pet" DROP COLUMN "dob"');
    await queryRunner.query('ALTER TABLE "pet" ADD "dob" date NOT NULL');
    await queryRunner.query(
      "CREATE TYPE \"public\".\"sale_transaction_status_enum_old\" AS ENUM('PET_AVAILABLE', 'NOT_PET_AVAILABLE', 'RECEIVED', 'NOT_RECEIVED', 'PAID')",
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" ALTER COLUMN "status" TYPE "public"."sale_transaction_status_enum_old" USING "status"::"text"::"public"."sale_transaction_status_enum_old"',
    );
    await queryRunner.query(
      'DROP TYPE "public"."sale_transaction_status_enum"',
    );
    await queryRunner.query(
      'ALTER TYPE "public"."sale_transaction_status_enum_old" RENAME TO "sale_transaction_status_enum"',
    );
    await queryRunner.query(
      'ALTER TABLE "health_record" DROP COLUMN "nextHealthCheck"',
    );
    await queryRunner.query(
      'ALTER TABLE "health_record" ADD "nextHealthCheck" date',
    );
    await queryRunner.query(
      'ALTER TABLE "health_record" DROP COLUMN "dateOfExam"',
    );
    await queryRunner.query(
      'ALTER TABLE "health_record" ADD "dateOfExam" date NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "vaccine_pet_record" ALTER COLUMN "dateOfInjection" SET DEFAULT \'2022-04-19 16:41:13.235\'',
    );
    await queryRunner.query('ALTER TABLE "paper" DROP COLUMN "date"');
    await queryRunner.query('ALTER TABLE "paper" ADD "date" date NOT NULL');
    await queryRunner.query('ALTER TABLE "order" DROP COLUMN "paymentMethod"');
    await queryRunner.query('ALTER TABLE "order" DROP COLUMN "paymentTime"');
  }
}
