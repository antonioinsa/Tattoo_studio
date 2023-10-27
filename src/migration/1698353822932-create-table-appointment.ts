import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateTableAppointment1698353822932 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("");
    }

}

