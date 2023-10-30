import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateTableTattooArtists1698353691519 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "workers",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment"
                    },
                    {
                        name: "first_name",
                        type: "varchar",
                        length: "20"
                    },
                    {
                        name: "last_name",
                        type: "varchar",
                        length: "20"
                    },
                    {
                        name: "email",
                        type: "varchar",
                        length: "30",
                        isUnique: true
                    },
                    {
                        name: "phone",
                        type: "varchar",
                        length: "12"
                    },
                    {
                        name: "nationality",
                        type: "varchar",
                        length: "13"
                    },
                    {
                        name: "password",
                        type: "varchar",
                        length: "200"
                    },
                    {
                        name: "is_active",
                        type: "boolean",
                        default: true
                    },
                    {
                        name: "role",
                        type: "enum",
                        enum: ["user", "admin", "superAdmin"],
                        default: '"user"'
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
        await queryRunner.dropTable("workers");
    }

}

