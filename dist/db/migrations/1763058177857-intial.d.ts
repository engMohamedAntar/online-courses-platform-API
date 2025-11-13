import { MigrationInterface, QueryRunner } from "typeorm";
export declare class Intial1763058177857 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
