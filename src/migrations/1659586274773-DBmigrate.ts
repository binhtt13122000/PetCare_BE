import { MigrationInterface, QueryRunner } from "typeorm";

export class DBmigrate1659586274773 implements MigrationInterface {
  name = "DBmigrate1659586274773";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "CREATE TYPE \"public\".\"room_type_enum\" AS ENUM('NORMAL', 'IMAGE', 'VIDEO')",
    );
    await queryRunner.query(
      'CREATE TABLE "room" ("id" SERIAL NOT NULL, "isSellerMessage" boolean, "content" text, "type" "public"."room_type_enum", "createdTime" TIMESTAMP, "roomId" integer, CONSTRAINT "PK_c6d46db005d623e691b2fbcba23" PRIMARY KEY ("id"))',
    );
    await queryRunner.query('ALTER TABLE "room" DROP COLUMN "content"');
    await queryRunner.query('ALTER TABLE "room" DROP COLUMN "roomId"');
    await queryRunner.query('ALTER TABLE "room" ADD "content" text');
    await queryRunner.query('ALTER TABLE "room" ADD "roomId" integer');
    await queryRunner.query(
      'ALTER TABLE "room" ADD "buyerId" integer NOT NULL',
    );
    await queryRunner.query('ALTER TABLE "room" ADD "postId" integer NOT NULL');
    await queryRunner.query(
      'ALTER TABLE "room" ADD "newestMessageTime" TIMESTAMP',
    );
    await queryRunner.query('ALTER TABLE "room" ADD "newestMessage" text');
    await queryRunner.query(
      'ALTER TABLE "room" ADD "sellerLastViewTime" TIMESTAMP',
    );
    await queryRunner.query(
      'ALTER TABLE "room" ADD "buyerLastViewTime" TIMESTAMP',
    );
    await queryRunner.query(
      'ALTER TABLE "room" ADD "transactionTime" TIMESTAMP',
    );
    await queryRunner.query('ALTER TABLE "room" ADD "transactionPlace" text');
    await queryRunner.query('ALTER TABLE "room" ADD "description" text');
    await queryRunner.query(
      "CREATE TYPE \"public\".\"room_status_enum\" AS ENUM('CREATED', 'BLOCKED', 'CLOSED', 'EXPIRED', 'REQUESTED')",
    );
    await queryRunner.query(
      'ALTER TABLE "room" ADD "status" "public"."room_status_enum"',
    );
    await queryRunner.query(
      'ALTER TYPE "public"."room_type_enum" RENAME TO "room_type_enum_old"',
    );
    await queryRunner.query(
      "CREATE TYPE \"public\".\"room_type_enum\" AS ENUM('SALE', 'BREED')",
    );
    await queryRunner.query(
      'ALTER TABLE "room" ALTER COLUMN "type" TYPE "public"."room_type_enum" USING "type"::"text"::"public"."room_type_enum"',
    );
    await queryRunner.query('DROP TYPE "public"."room_type_enum_old"');
    await queryRunner.query(
      'ALTER TABLE "room" ADD CONSTRAINT "FK_45770efde052e41dee06d89c85c" FOREIGN KEY ("roomId") REFERENCES "room"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "room" ADD CONSTRAINT "FK_3b203c27711baf1fdc9a2820841" FOREIGN KEY ("buyerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "room" ADD CONSTRAINT "FK_61790f32573a6c201bab5ebe6ad" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "room" DROP CONSTRAINT "FK_61790f32573a6c201bab5ebe6ad"',
    );
    await queryRunner.query(
      'ALTER TABLE "room" DROP CONSTRAINT "FK_3b203c27711baf1fdc9a2820841"',
    );
    await queryRunner.query(
      'ALTER TABLE "room" DROP CONSTRAINT "FK_45770efde052e41dee06d89c85c"',
    );
    await queryRunner.query(
      "CREATE TYPE \"public\".\"room_type_enum_old\" AS ENUM('NORMAL', 'IMAGE', 'VIDEO')",
    );
    await queryRunner.query(
      'ALTER TABLE "room" ALTER COLUMN "type" TYPE "public"."room_type_enum_old" USING "type"::"text"::"public"."room_type_enum_old"',
    );
    await queryRunner.query('DROP TYPE "public"."room_type_enum"');
    await queryRunner.query(
      'ALTER TYPE "public"."room_type_enum_old" RENAME TO "room_type_enum"',
    );
    await queryRunner.query('ALTER TABLE "room" DROP COLUMN "status"');
    await queryRunner.query('DROP TYPE "public"."room_status_enum"');
    await queryRunner.query('ALTER TABLE "room" DROP COLUMN "description"');
    await queryRunner.query(
      'ALTER TABLE "room" DROP COLUMN "transactionPlace"',
    );
    await queryRunner.query('ALTER TABLE "room" DROP COLUMN "transactionTime"');
    await queryRunner.query(
      'ALTER TABLE "room" DROP COLUMN "buyerLastViewTime"',
    );
    await queryRunner.query(
      'ALTER TABLE "room" DROP COLUMN "sellerLastViewTime"',
    );
    await queryRunner.query('ALTER TABLE "room" DROP COLUMN "newestMessage"');
    await queryRunner.query(
      'ALTER TABLE "room" DROP COLUMN "newestMessageTime"',
    );
    await queryRunner.query('ALTER TABLE "room" DROP COLUMN "postId"');
    await queryRunner.query('ALTER TABLE "room" DROP COLUMN "buyerId"');
    await queryRunner.query('ALTER TABLE "room" DROP COLUMN "roomId"');
    await queryRunner.query('ALTER TABLE "room" DROP COLUMN "content"');
    await queryRunner.query('ALTER TABLE "room" ADD "roomId" integer');
    await queryRunner.query('ALTER TABLE "room" ADD "content" text');
    await queryRunner.query('DROP TABLE "room"');
    await queryRunner.query('DROP TYPE "public"."room_type_enum"');
  }
}
