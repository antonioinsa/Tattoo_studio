import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateTableProducts1698353804252 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "products",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment"
                    },
                    {
                        name: "description",
                        type: "varchar",
                        length: "200"
                    },
                    {
                        name: "article",
                        type: "varchar",
                        length: "200"
                    },
                    {
                        name: "intervention_type",
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
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("products");
    }

}
