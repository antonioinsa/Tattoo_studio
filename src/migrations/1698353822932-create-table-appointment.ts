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
                        name: "price",
                        type: "decimal",
                        precision: 7,
                        scale: 2,
                        default: "0"
                    },
                    {
                        name: "date",
                        type: "date",
                        isNullable: false
                    },
                    {
                        name: "hour",
                        type: "enum",
                        enum: ["morning", "afternoon"]
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
