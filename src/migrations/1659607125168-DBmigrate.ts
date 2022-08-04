import { MigrationInterface, QueryRunner } from "typeorm";

export class DBmigrate1659607125168 implements MigrationInterface {
  name = "DBmigrate1659607125168";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "room" DROP CONSTRAINT "FK_45770efde052e41dee06d89c85c"',
    );
    await queryRunner.query(
      "CREATE TYPE \"public\".\"message_type_enum\" AS ENUM('NORMAL', 'IMAGE', 'VIDEO')",
    );
    await queryRunner.query(
      'CREATE TABLE "message" ("id" SERIAL NOT NULL, "isSellerMessage" boolean, "content" text, "type" "public"."message_type_enum", "createdTime" TIMESTAMP, "roomId" integer, CONSTRAINT "PK_ba01f0a3e0123651915008bc578" PRIMARY KEY ("id"))',
    );
    await queryRunner.query('ALTER TABLE "room" DROP COLUMN "content"');
    await queryRunner.query('ALTER TABLE "room" DROP COLUMN "roomId"');
    await queryRunner.query(
      'ALTER TABLE "message" ADD CONSTRAINT "FK_fdfe54a21d1542c564384b74d5c" FOREIGN KEY ("roomId") REFERENCES "room"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "message" DROP CONSTRAINT "FK_fdfe54a21d1542c564384b74d5c"',
    );
    await queryRunner.query('ALTER TABLE "room" ADD "roomId" integer');
    await queryRunner.query('ALTER TABLE "room" ADD "content" text');
    await queryRunner.query('DROP TABLE "message"');
    await queryRunner.query('DROP TYPE "public"."message_type_enum"');
    await queryRunner.query(
      'ALTER TABLE "room" ADD CONSTRAINT "FK_45770efde052e41dee06d89c85c" FOREIGN KEY ("roomId") REFERENCES "room"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }
}
