import { MigrationInterface, QueryRunner } from "typeorm";
export declare class Intial1763070682533 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
