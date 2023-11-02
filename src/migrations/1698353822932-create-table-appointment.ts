import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateTableAppointments1698353822932 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "appointments",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment"
                    },
                    {
                        name: "client_id",
                        type: "int"
                    },
                    {
                        name: "tattoo_artist_id",
                        type: "int"
                    },
                    {
                        name: "intervention_type",
                        type: "enum",
                        enum: ["tattoo", "piercing"]
                    },
                    {
                        name: "day",
                        type: "enum",
                        enum: ["monday", "tuesday", "wednesday", "thursday", "friday"]
                    },
                    {
                        name: "hour",
                        type: "enum",
                        enum: ["09:00", "11:00", "11:30", "12:00", "16:30", "17:00", "17:30", "18:00"]
                    },
                    {
                        name: "article",
                        type: "varchar",
                        length: "200"
                    },
                    {
                        name: "description",
                        type: "varchar",
                        length: "200"
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                        onUpdate: "CURRENT_TIMESTAMP"
                    },
                ],
                foreignKeys: [
                    {
                        columnNames: ["client_id"],
                        referencedTableName: "clients",
                        referencedColumnNames: ["id"],
                        onDelete: "CASCADE"
                    },
                    {
                        columnNames: ["tattoo_artist_id"],
                        referencedTableName: "workers",
                        referencedColumnNames: ["id"],
                        onDelete: "CASCADE"
                    },
                ]
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("appointments");
    }

}
