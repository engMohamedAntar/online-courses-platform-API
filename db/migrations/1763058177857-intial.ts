import { MigrationInterface, QueryRunner } from "typeorm";

export class Intial1763058177857 implements MigrationInterface {
    name = 'Intial1763058177857'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."payments_status_enum" AS ENUM('pending', 'success', 'failed')`);
        await queryRunner.query(`CREATE TYPE "public"."payments_provider_enum" AS ENUM('stripe', 'paypal')`);
        await queryRunner.query(`CREATE TABLE "payments" ("id" SERIAL NOT NULL, "amount" numeric(10,2) NOT NULL, "currency" character varying(10) NOT NULL, "status" "public"."payments_status_enum" NOT NULL DEFAULT 'pending', "provider" "public"."payments_provider_enum" NOT NULL, "transactionId" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, "courseId" integer, CONSTRAINT "PK_197ab7af18c93fbb0c9b28b4a59" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "User" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" character varying NOT NULL DEFAULT 'student', "profileImageKey" character varying, "isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_4a257d2c9837248d70640b3e36e" UNIQUE ("email"), CONSTRAINT "PK_9862f679340fb2388436a5ab3e4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."enrollment_paymentstatus_enum" AS ENUM('pending', 'success', 'failed')`);
        await queryRunner.query(`CREATE TABLE "enrollment" ("id" SERIAL NOT NULL, "paymentStatus" "public"."enrollment_paymentstatus_enum" NOT NULL DEFAULT 'pending', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, "courseId" integer, CONSTRAINT "PK_7e200c699fa93865cdcdd025885" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "lesson" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "videoKey" character varying, "description" text, "courseId" integer, CONSTRAINT "PK_0ef25918f0237e68696dee455bd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "course" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" text, "thumbnailKey" character varying, "price" integer NOT NULL DEFAULT '0', "duration" integer NOT NULL DEFAULT '0', "enrolledCount" integer NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "instructorId" integer, CONSTRAINT "PK_bf95180dd756fd204fb01ce4916" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "payments" ADD CONSTRAINT "FK_d35cb3c13a18e1ea1705b2817b1" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payments" ADD CONSTRAINT "FK_00097d3b3147848e3585aabb433" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "enrollment" ADD CONSTRAINT "FK_e97ecbf11356b5173ce7fb0b060" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "enrollment" ADD CONSTRAINT "FK_d1a599a7740b4f4bd1120850f04" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "lesson" ADD CONSTRAINT "FK_3801ccf9533a8627c1dcb1e33bf" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "course" ADD CONSTRAINT "FK_32d94af473bb59d808d9a68e17b" FOREIGN KEY ("instructorId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "course" DROP CONSTRAINT "FK_32d94af473bb59d808d9a68e17b"`);
        await queryRunner.query(`ALTER TABLE "lesson" DROP CONSTRAINT "FK_3801ccf9533a8627c1dcb1e33bf"`);
        await queryRunner.query(`ALTER TABLE "enrollment" DROP CONSTRAINT "FK_d1a599a7740b4f4bd1120850f04"`);
        await queryRunner.query(`ALTER TABLE "enrollment" DROP CONSTRAINT "FK_e97ecbf11356b5173ce7fb0b060"`);
        await queryRunner.query(`ALTER TABLE "payments" DROP CONSTRAINT "FK_00097d3b3147848e3585aabb433"`);
        await queryRunner.query(`ALTER TABLE "payments" DROP CONSTRAINT "FK_d35cb3c13a18e1ea1705b2817b1"`);
        await queryRunner.query(`DROP TABLE "course"`);
        await queryRunner.query(`DROP TABLE "lesson"`);
        await queryRunner.query(`DROP TABLE "enrollment"`);
        await queryRunner.query(`DROP TYPE "public"."enrollment_paymentstatus_enum"`);
        await queryRunner.query(`DROP TABLE "User"`);
        await queryRunner.query(`DROP TABLE "payments"`);
        await queryRunner.query(`DROP TYPE "public"."payments_provider_enum"`);
        await queryRunner.query(`DROP TYPE "public"."payments_status_enum"`);
    }

}
